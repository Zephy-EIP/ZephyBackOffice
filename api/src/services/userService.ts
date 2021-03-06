import RoleDao from '@/daos/Roles/RoleDao';
import SessionDao from '@/daos/Session/SessionDao';
import UserDao from '@/daos/User/UserDao';
import Role from '@/entities/Role';
import Session from '@/entities/Session';
import User, { UserSafeInfo } from '@/entities/User';
import { createAuthToken } from '@/shared/authentication/authentication';
import { generateSalt, hashPassword } from '@/shared/hashing';

namespace UserService {

    export async function authenticate(email: string, password: string): Promise<string | undefined> {
        let user = await UserDao.get(email);
        if (user == null)
            return undefined;

        let hash = hashPassword(password, user.salt);
        if (hash != user.pass)
            return undefined;
        let session = await SessionDao.create(user.id);
        if (session === null)
            return undefined;
        let token = createAuthToken(session);
        return token;
    }

    export function deleteSession(session: Session): Promise<boolean> {
        return SessionDao.delete(session);
    }

    export function emailIsValid(email: string): boolean {
        return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email) && email.length < 255;
    }

    export function usernameIsValid(username: string): boolean {
        return username.length >= 3 && /^[a-zA-Z0-9 ]*$/.test(username) && username.length < 50;
    }

    /** password at least 8 chars, one special char, one lowercase character, one uppercase character*/
    export function passwordIsValid(password: string): boolean {
        return /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,128}/.test(password);
    }

    export async function createAccount(email: string, password: string, username: string, roleId: number | null, creator: User): Promise<number> {
        if (roleId !== null) {
            const role = await RoleDao.get(roleId);
            if (role === null)
                return 404;
            if (creator.role_id === null || creator.role!.importance > role.importance)
                return 403;
        }

        let user = new User({email: email, username: username, role_id: roleId});
        user.salt = generateSalt();
        user.pass = hashPassword(password, user.salt);
        if (await UserDao.create(user) !== null)
            return 200;
        return 500;
    };

    export async function userExists(email: string): Promise<boolean> {
        return await UserDao.get(email) !== null;
    };

    /**
     * @returns {number} HTTP code
     */
    export async function changePassword(oldPassword: string, newPassword: string, user: User): Promise<number> {
        const hash = hashPassword(oldPassword, user.salt);
        if (hash !== user.pass)
            return 422;
        user.pass = hashPassword(newPassword, user.salt);
        return await UserDao.update(user) === true ? 200 : 500;
    }

    export async function changeUsername(user: User, newUsername: string): Promise<number> {
        user.username = newUsername;
        return await UserDao.update(user) === true ? 200 : 500;
    }

    /**
     * @returns {number} http code
     */
    export async function setRole(requestingUser: User, userIdOrMail: string | number, desiredRole: number | null): Promise<number> {
        if (requestingUser.role_id === null)
            return 403;
        let role: Role | null = null;
        if (desiredRole !== null) {
            role = await RoleDao.get(desiredRole);
            if (role === null)
                return 404;
            if (role.importance <= requestingUser.role!.importance)
                return 403;
        }
        let affectedUser: User | null = null;
        if (typeof userIdOrMail === 'string')
            affectedUser = await UserDao.get(userIdOrMail);
        else
            affectedUser = await UserDao.getById(userIdOrMail);

        if (affectedUser === null)
            return 400;

        await UserDao.fillRole(affectedUser);

        if (affectedUser.role !== undefined && affectedUser.role.importance <= requestingUser.role!.importance)
            return 403;

        affectedUser.role_id = desiredRole;
        UserDao.update(affectedUser);
        return 200;
    }

    export async function getList(): Promise<UserSafeInfo[]> {
        const users = await UserDao.list();
        return users.map(user => user.getSafeInfo());
    }

};

export default UserService;

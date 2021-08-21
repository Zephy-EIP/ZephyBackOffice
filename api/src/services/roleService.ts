import RoleDao from '@/daos/Roles/RoleDao';
import UserDao from '@/daos/User/UserDao';
import Role from '@/entities/Role';
import User from '@/entities/User';

namespace RoleService {

    export function list(): Promise<Role[]> {
        return RoleDao.list();
    }

    /**
     * @returns {number} http error code or newly created Role
     */
    export async function createRole(creator: User, importance: number, name: string): Promise<number | Role> {
        if (creator.role_id === null || creator.role_id > importance)
            return 403;
        if (creator.role === undefined)
            if (await UserDao.fillRole(creator) === false)
                return 500;
        const role = new Role({display_name: name, importance: importance});
        const id = await RoleDao.create(role);
        if (id === null)
            return 500;
        role.id = id;
        return role;
    }

    /**
     * @returns {number} http error code or updated Role
     */
    export async function updateRole(requester: User, id: number, name?: string, importance?: number): Promise<number | Role> {
        if (requester.role_id === null)
            return 403;
        if (requester.role === undefined) {
            if (await UserDao.fillRole(requester) === false)
                return 500;
        }
        const role = await RoleDao.get(id);
        if (role === null)
            return 404;
        if (importance !== undefined) {
            if (requester.role!.importance > importance || requester.role!.importance > role.importance)
                return 403;
            role.importance = importance;
        }
        if (name !== undefined)
            role.display_name = name;
        if (await RoleDao.update(role) === true) {
            return role;
        }
        return 500;
    }

    /**
     * @returns {number} http error code or updated Role
     */
    export async function deleteRole(requester: User, id: number): Promise<number> {
        if (requester.role?.importance === null)
            return 403;
        const role = await RoleDao.get(id);
        if (role === null)
            return 404;
        if (requester.role!.importance > role.importance)
            return 403;
        if (await RoleDao.delete(role.id))
            return 200;
        return 500;
    }

}

export default RoleService;

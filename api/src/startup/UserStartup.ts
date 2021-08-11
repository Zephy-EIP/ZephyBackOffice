import RoleDao from '@/daos/Roles/RoleDao';
import UserDao from '@/daos/User/UserDao';
import Role from '@/entities/Role';
import User from '@/entities/User';
import { generateSalt, hashPassword } from '@/shared/hashing';
import logger from '@/shared/logger';

export default async function checkAndCreateUser(): Promise<void> {
    if (await UserDao.count() !== 0 || await RoleDao.count() !== 0) {
        logger.info('User startup: User or Role already exist, skipping root user startup');
        return;
    }
    const admin = await createDefautlAdminRole();
    if (admin === null) {
        logger.err('User startup: error: could not create Admin Role');
        return;
    }

    const user = await createDefaultUser(admin.id);
    if (user === null) {
        logger.err('User startup: error: could not create default user');
        return;
    }

    logger.imp('User startup: success');
}

async function createDefaultUser(adminRoleId: number): Promise<User | null> {
    const username = process.env.DEFAULT_ADMIN_USERNAME || 'root';
    const email = process.env.DEFAULT_ADMIN_EMAIL || 'root@0.0.0.0';
    const password = process.env.DEFAULT_ADMIN_PASSWORD || 'root';
    const salt = generateSalt();
    const hash = hashPassword(password, salt);

    let user = new User({username: username, email: email, pass: hash, salt: salt});
    const userId = await UserDao.create(user)
        .catch(err => {
            logger.err(err);
            return null;
        });
    if (userId === null) {
        return null;
    }
    user.id = userId;
    user.role_id = adminRoleId;
    UserDao.update(user);
    return user;
}

async function createDefautlAdminRole(): Promise<Role | null> {
    const roleName = process.env.DEFAULT_ADMIN_ROLE || 'admin';
    const importance = 0;
    let admin = new Role({display_name: roleName, importance: importance});
    const id = await RoleDao.create(admin)
        .catch(err => {
            logger.err(err);
            return null;
        });
    if (id === null)
        return null;
    admin.id = id;
    return admin;
}

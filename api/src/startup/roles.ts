import RoleDao from '@/daos/Roles/RoleDao';
import Role from '@/entities/Role';
import logger from '@/shared/logger';

export async function checkAndInitRoles(): Promise<void> {
    if (await RoleDao.roleCount() === 0) {
        const admin = new Role({display_name: 'Admin', importance: 0});
        const guest = new Role({display_name: 'Guest', importance: 1000});
        RoleDao.create(admin).then(result => {
            if (result === null) {
                logger.err("Error: couldn't create admin");
                return;
            }
            logger.info('Created admin role');
        });
        RoleDao.create(guest).then(result => {
            if (result === null) {
                logger.err("Error: couldn't create guest");
                return;
            }
            logger.info('Created guest role');
        });
    }
}

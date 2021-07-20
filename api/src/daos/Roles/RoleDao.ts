import Role from '@/entities/Role';
import pool from '@/shared/pool';

export interface IRoleDao {
    get: (id: number) => Promise<Role|null>;
    create: (role: Role) => Promise<number|null>;
    update: (role: Role) => Promise<boolean>;
}

class RoleDaoClass implements IRoleDao {

    async update (role: Role): Promise<boolean> {
        const q = await pool.query(
            'update roles set display_name = $1, importance = $2 returning id',
            [role.display_name, role.importance]
        );
        return q.rowCount == 1;
    }

    async get(id: number): Promise<Role|null> {
        const q = await pool.query('select * from roles where id=$1', [id]);
        if (q.rowCount == 0)
            return null;
        return new Role(q.rows[0]);
    };

    /**
     * Returns the id if the user is created, and null otherwise
     */
    async create(role: Role): Promise<number|null> {
        let success = false;
        let id = 0;
        await pool.query(
            'insert into roles (display_name, importance) values ($1, $2) returning id',
            [role.display_name, role.importance]
        ).then(q => {
            if (q.rowCount == 0)
                return;
            id = q.rows[0].id;
            success = true;
        });
        if (!success)
            return null;
        return id;
    };

    async roleCount() {
        const q = await pool.query('select count(*) from roles');
        return q.rowCount;
    }

}

const RoleDao = new RoleDaoClass();
export default RoleDao;

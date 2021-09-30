import Role from '@/entities/Role';
import pool from '@/shared/pool';

export interface IRoleDao {
    get: (id: number) => Promise<Role|null>;
    create: (role: Role) => Promise<number|null>;
    update: (role: Role) => Promise<boolean>;
    count: () => Promise<number>;
    list: () => Promise<Role[]>;
    delete: (id: number) => Promise<boolean>;
}

class RoleDaoClass implements IRoleDao {

    async list(): Promise<Role[]> {
        return await pool.query(
            'select * from roles'
        ).then(q => {
            const list: Role[] = [];
            q.rows.forEach(role => {
                list.push(new Role(role));
            });
            return list;
        }).catch(() => []);
    }

    async count(): Promise<number> {
        return await pool.query(
            'select count(id) from roles'
        ).then (q => parseInt(q.rows[0].count)).catch(() => 0);
    }

    async update (role: Role): Promise<boolean> {
        return await pool.query(
            'update roles set display_name = $1, importance = $2  where id=$3 returning id',
            [role.display_name, role.importance, role.id]
        ).then (q => q.rowCount == 1).catch(() => false);
    }

    async get(id: number): Promise<Role|null> {
        return await pool.query('select * from roles where id=$1', [id])
            .then(q => {
                if (q.rowCount == 0)
                    return null;
                return new Role(q.rows[0]);
            }).catch(() => null);
    };

    /**
     * Returns the id if the user is created, and null otherwise
     */
    async create(role: Role): Promise<number|null> {
        return await pool.query(
            'insert into roles (display_name, importance) values ($1, $2) returning id',
            [role.display_name, role.importance]
        ).then(q => {
            if (q.rowCount === 0)
                return null;
            return q.rows[0].id;
        }).catch(() => null);
    };

    async delete(id: number): Promise<boolean> {
        return await pool.query('delete from roles where id = $1 returning *', [id])
            .then(q => q.rowCount > 0)
            .catch(() => false);
    }
}

const RoleDao = new RoleDaoClass();
export default RoleDao;

import User from '@/entities/User';
import pool from '@/shared/pool';
import RoleDao from '@/daos/Roles/RoleDao';

export interface IUserDao {
    getById: (id: number) => Promise<User | null>;
    get: (email: string) => Promise<User|null>;
    create: (user: User) => Promise<number|null>;
    update: (user: User) => Promise<boolean>;
    count: () => Promise<number>;
    fillRole: (user: User) => Promise<boolean>;
    list: () => Promise<User[]>;
}

class UserDaoClass implements IUserDao {
    async count(): Promise<number> {
        return await pool.query('select count(id) from users')
            .then(q => parseInt(q.rows[0].count)).catch(() => 0);
    }

    async update (user: User): Promise<boolean> {
        return await pool.query(
            'update users set email = $1, username = $2, pass = $3, salt = $4, role_id = $5 where id = $6 returning id',
            [user.email, user.username, user.pass, user.salt, user.role_id, user.id]
        )
            .then(q => q.rowCount === 1)
            .catch(() => false);
    }

    async getById(id: number): Promise<User|null> {
        return await pool.query('select * from users where id=$1', [id])
            .then(q => {
                if (q.rowCount < 1)
                    return null;
                return new User(q.rows[0]);
            })
            .catch(_err => {
                return null;
            });
    }

    async get(email: string): Promise<User|null> {
        return await pool.query('select * from users where email=$1', [email])
            .then(q => {
                if (q.rowCount == 0)
                    return null;
                return new User(q.rows[0]);
            })
            .catch(() => null);
    };

    async fillRole(user: User): Promise<boolean> {
        if (user.role_id === null)
            return false;
        const role = await RoleDao.get(user.role_id);

        if (role === null)
            return false;
        user.role = role;
        return true;
    }

    /**
     * Returns the id if the user is created, and null otherwise
     */
    async create(user: User): Promise<number|null> {
        return await pool.query(
            'insert into users (email, username, pass, salt, role_id) values ($1, $2, $3, $4, $5) on conflict do nothing returning id',
            [user.email, user.username, user.pass, user.salt, user.role_id]
        ).then(q => {
            if (q.rowCount == 0)
                return;
            return q.rows[0].id;
        }).catch(() => null);
    };

    async list(): Promise<User[]> {
        return await pool.query(
            'select * from users'
        ).then(q => {
        const list: User[] = [];
            q.rows.forEach(row => {
                list.push(new User(row));
            });
            return list;
        }).catch(() => []);
    }

}

const UserDao = new UserDaoClass();
export default UserDao;

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
        const q = await pool.query(
            'select count(id) from users'
        );
        return parseInt(q.rows[0].count);
    }

    async update (user: User): Promise<boolean> {
        const q = await pool.query(
            'update users set email = $1, username = $2, pass = $3, salt = $4, role_id = $5 where id = $6 returning id',
            [user.email, user.username, user.pass, user.salt, user.role_id, user.id]
        );
        return q.rowCount == 1;
    }

    async getById(id: number): Promise<User|null> {
        const q = await pool.query('select * from users where id=$1', [id]);
        if (q.rowCount == 0)
            return null;
        return new User(q.rows[0]);
    }

    async get(email: string): Promise<User|null> {
        const q = await pool.query('select * from users where email=$1', [email]);
        if (q.rowCount == 0)
            return null;
        return new User(q.rows[0]);
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
        let success = false;
        let id = 0;
        await pool.query(
            'insert into users (email, username, pass, salt) values ($1, $2, $3, $4) on conflict do nothing returning id',
            [user.email, user.username, user.pass, user.salt]
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

    async list(): Promise<User[]> {
        const q = await pool.query(
            'select * from users'
        );
        const list: User[] = [];
        q.rows.forEach(row => {
            list.push(new User(row));
        });
        return list;
    }

}

const UserDao = new UserDaoClass();
export default UserDao;

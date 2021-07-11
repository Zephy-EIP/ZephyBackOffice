import User from '@/entities/User';
import pool from '@/shared/pool';

export interface IUserDao {
    get: (email: string) => Promise<User|null>;
    create: (user: User) => Promise<number|null>;
    update: (user: User) => Promise<boolean>;
}

class UserDaoClass implements IUserDao {

    async update (user: User): Promise<boolean> {
        const q = await pool.query(
            'update users set email = $1, username = $2, pass = $3, salt = $4 where id = $5 returning id',
            [user.email, user.username, user.pass, user.salt, user.id]
        );
        return q.rowCount == 1;
    }

    async get(email: string): Promise<User|null> {
        const q = await pool.query('select * from users where email=$1', [email]);
        if (q.rowCount == 0)
            return null;
        return new User(q.rows[0]);
    };

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

}

const UserDao = new UserDaoClass();
export default UserDao;

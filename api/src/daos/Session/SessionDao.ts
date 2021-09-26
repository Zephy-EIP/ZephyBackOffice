import Session from '@/entities/Session';
import User from '@/entities/User';
import AuthInfo from '@/shared/authentication/authInfo';
import pool from '@/shared/pool';

export interface ISessionDao {
    getAuthInfo: (user_id: number, session_id: number) => Promise<AuthInfo | null>;
    create: (user_id: number) => Promise<Session>;
    delete: (session: Session) => Promise<boolean>;
}

class SessionDaoClass implements ISessionDao {
    async getAuthInfo(user_id: number, session_id: number): Promise<AuthInfo | null> {
        const q = await pool.query(
            'select u.*, s.id as session_id from sessions s join users u on u.id=$1 where s.id=$2 and s.user_id = $1',
            [user_id, session_id]
        );
        if (q.rowCount == 0)
            return null;
        let info: AuthInfo = new AuthInfo();
        info.session = new Session({id: q.rows[0].session_id, user_id: q.rows[0].id});
        info.user = new User(q.rows[0]);
        return info;
    }

    async create(user_id: number): Promise<Session> {
        const q = await pool.query('insert into sessions (user_id) values ($1) returning *', [user_id]);
        return new Session(q.rows[0]);
    }

    async delete(session: Session): Promise<boolean> {
        const q = await pool.query('delete from sessions where id = $1 and user_id = $2 returning *', [session.id, session.user_id]);
        return q.rowCount > 0;
    }
}

const SessionDao = new SessionDaoClass();
export default SessionDao;

import Session from '@/entities/Session';
import User from '@/entities/User';
import AuthInfo from '@/shared/authentication/authInfo';
import pool from '@/shared/pool';

export interface ISessionDao {
    getAuthInfo: (user_id: number, session_id: number) => Promise<AuthInfo | null>;
    create: (user_id: number) => Promise<Session | null>;
    delete: (session: Session) => Promise<boolean>;
}

class SessionDaoClass implements ISessionDao {
    async getAuthInfo(user_id: number, session_id: number): Promise<AuthInfo | null> {
        return await pool.query(
            'select u.*, s.id as session_id from sessions s join users u on u.id=$1 where s.id=$2 and s.user_id = $1',
            [user_id, session_id]
        ).then(q => {
            if (q.rowCount == 0)
                return null;
            let info: AuthInfo = new AuthInfo();
            info.session = new Session({id: q.rows[0].session_id, user_id: q.rows[0].id});
            info.user = new User(q.rows[0]);
            return info;
        }).catch(() => null);
    }

    async create(user_id: number): Promise<Session | null> {
        return await pool.query('insert into sessions (user_id) values ($1) returning *', [user_id])
            .then(q => {
                return new Session(q.rows[0]);
            }).catch(() => null);
    }

    async delete(session: Session): Promise<boolean> {
        return await pool.query(
            'delete from sessions where id = $1 and user_id = $2 returning *'
            , [session.id, session.user_id]
        )
            .then(q => q.rowCount > 0)
            .catch(() => false);
    }
}

const SessionDao = new SessionDaoClass();
export default SessionDao;

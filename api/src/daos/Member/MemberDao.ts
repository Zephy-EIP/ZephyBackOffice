import Member, { IMember } from '@/entities/Member';
import pool from '@/shared/pool';

export interface IMemberDao {
    exists(name: string): Promise<boolean>;
    list(): Promise<Member[]>;
    add(name: string): Promise<boolean>;
    delete(name: string): Promise<boolean>;
    rename(oldName: string, newName: string): Promise<boolean>;
}

class MemberDaoClass implements IMemberDao {
    async delete(name: string): Promise<boolean> {
        return await pool.query(
            'delete from members where member_name = $1 returning *',
            [name]
        )
            .then(res => res.rowCount === 1)
            .catch(_err => false);
    }

    async exists(name: string): Promise<boolean> {
        return await pool.query(
            'select * from members where member_name = $1',
            [name]
        )
            .then(res => res.rowCount === 1)
            .catch(_err => false);
    }

    async list(): Promise<Member[]> {
        return await pool.query<IMember>(
            'select * from members'
        )
            .then(res => res.rows.map(value => { return new Member(value) }))
            .catch(_err => []);
    }

    async add(name: string): Promise<boolean> {
        return await pool.query<IMember>(
            'insert into members (member_name) values ($1) returning member_name',
            [name]
        )
            .then(res => res.rowCount === 1)
            .catch(_err => false);
    }

    async rename(oldName: string, newName: string): Promise<boolean> {
        return await pool.query<IMember>(
            'update members set member_name = $2 where member_name = $1 returning member_name',
            [oldName, newName]
        )
            .then(res => res.rowCount === 1)
            .catch(_err => false);
    }
}

const MemberDao = new MemberDaoClass();
export default MemberDao;

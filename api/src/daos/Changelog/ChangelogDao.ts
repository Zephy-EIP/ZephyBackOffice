import Changelog, { IChangelog } from '@/entities/Changelog';
import pool from '@/shared/pool';

export interface IChangelogDao {
    list(): Promise<Changelog[]>;
    get(id: number): Promise<Changelog | null>;
    create(changelog: Changelog): Promise<Changelog | null>;
    update(changelog: Changelog): Promise<boolean>;
    delete(changelog: Changelog): Promise<boolean>;
}

class ChangelogDaoClass implements IChangelogDao {

    async list(): Promise<Changelog[]> {
        return await pool.query<IChangelog>(
            'select * from changelogs'
        )
            .then(res => {
                return res.rows.map(changelog => new Changelog(changelog))
            })
            .catch(_err => []);
    }

    async get(id: number): Promise<Changelog | null> {
        return await pool.query<IChangelog>(
            'select * from changelogs where id = $1',
            [id]
        )
            .then(res => {
                if (res.rowCount === 0)
                    return null;
                return new Changelog(res.rows[0]);
            })
            .catch(_err => null);
    }

    async create(changelog: Changelog): Promise<Changelog | null> {
        return await pool.query<IChangelog>(
            'insert into changelogs ("version", author, sections, "comments") values ($1, $2, $3, $4) returning *',
            [changelog.version, changelog.author, changelog.sections, changelog.comments]
        )
            .then(res => {
                if (res.rowCount === 0)
                    return null;
                return new Changelog(res.rows[0]);
            })
            .catch(_err => null);
    }

    async update(changelog: Changelog): Promise<boolean> {
        return await pool.query<IChangelog>(
            'update changelogs set "date" = $1, "version" = $2, author = $3, sections = $4, "comments" = $5 where id = $6 returning *',
            [changelog.date, changelog.version, changelog.author, changelog.sections, changelog.comments, changelog.id]
        )
            .then(res => res.rowCount === 1)
            .catch(_err => false);
    }

    async delete(changelog: Changelog): Promise<boolean> {
        return await pool.query<IChangelog>(
            'delete from changelogs where id = $1 returning *',
            [changelog.id]
        )
            .then(res => res.rowCount === 1)
            .catch(_err => false);
    }
}

const ChangelogDao = new ChangelogDaoClass();
export default ChangelogDao;

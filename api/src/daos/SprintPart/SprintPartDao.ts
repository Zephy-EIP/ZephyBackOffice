import SprintPart, { ISprintPart } from '@/entities/SprintPart';
import pool from '@/shared/pool';

export interface ISprintPartDao {
    list(sprintName: string | undefined): Promise<SprintPart[]>;
    get(id: number): Promise<SprintPart | null>;
    create(sprintPart: SprintPart): Promise<SprintPart | null>;
    update(sprintPart: SprintPart): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}

class SprintPartDaoClass implements ISprintPartDao {
    async list(sprintName?: string): Promise<SprintPart[]> {
        let query = 'select * from sprint_parts where sprint_name = $1 order by id desc';
        let queryArgs = [sprintName];

        if (sprintName === undefined) {
            query = 'select * from sprint_parts order by id desc';
            queryArgs = [];
        }

        return await pool.query<ISprintPart>(
            query,
            queryArgs
        )
            .then(q => q.rows.map(part => new SprintPart(part)))
            .catch(_err => []);
    }

    async get(id: number): Promise<SprintPart | null> {
        return await pool.query<ISprintPart>(
            'select * from sprint_parts where id = $1',
            [id]
        )
            .then(q => {
                if (q.rowCount === 0)
                    return null;
                return new SprintPart(q.rows[0]);
            })
            .catch(_err => null);
    }

    async create(sprintPart: SprintPart): Promise<SprintPart | null> {
        return await pool.query<ISprintPart>(
            'insert into sprint_parts (sprint_name, title, description, "type") values ($1, $2, $3, $4) returning *',
            [sprintPart.sprint_name, sprintPart.title, sprintPart.description, sprintPart.type]
        )
            .then(q => {
                if (q.rowCount === 0)
                    return null;
                return new SprintPart(q.rows[0]);
            })
            .catch(_err => null);
    }

    async update(sprintPart: SprintPart): Promise<boolean> {
        return await pool.query<ISprintPart>(
            'update sprint_parts set title = $2, description = $3, "type" = $4 where id = $1 returning *',
            [sprintPart.id, sprintPart.title, sprintPart.description, sprintPart.type]
        )
            .then(q => q.rowCount > 0)
            .catch(_err => false);
    }

    async delete(id: number): Promise<boolean> {
        return await pool.query<ISprintPart>(
            'delete from sprint_parts where id = $1 returning *',
            [id]
        )
            .then(q => q.rowCount > 0)
            .catch(_err => false);
    }
}

const SprintPartDao = new SprintPartDaoClass();
export default SprintPartDao;

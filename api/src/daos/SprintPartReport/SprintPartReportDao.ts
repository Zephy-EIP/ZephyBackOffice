import SprintPartReport, { ISprintPartReport } from '@/entities/SprintPartReport';
import pool from '@/shared/pool';

export interface ISprintPartReportDao {
    list(sprintPartid: number | undefined): Promise<SprintPartReport[]>;
    get(sprintPartId: number, memberName: string): Promise<SprintPartReport | null>;
    create(spr: SprintPartReport): Promise<SprintPartReport | null>;
    update(spr: SprintPartReport): Promise<boolean>;
    delete(spr: SprintPartReport): Promise<boolean>;
}

class SprintPartReportDaoClass implements ISprintPartReportDao {
    async list(sprintPartId: number | undefined): Promise<SprintPartReport[]> {
        let query = 'select * from sprint_part_reports';
        let queryArgs: any[] | undefined;

        if (typeof sprintPartId === 'number') {
            query += ' where sprint_part_id = $1';
            queryArgs = [sprintPartId];
        }

        return await pool.query<ISprintPartReport>(
            query,
            queryArgs
        )
            .then(res => res.rows.map(spr => new SprintPartReport(spr)))
            .catch(_err => []);
    }

    async get(sprintPartId: number, memberName: string): Promise<SprintPartReport | null> {
        return await pool.query<ISprintPartReport>(
            'select * from sprint_part_reports where sprint_part_id = $1 and member_name = $2',
            [sprintPartId, memberName]
        )
            .then(res => {
                if (res.rowCount > 0)
                    return new SprintPartReport(res.rows[0]);
                return null;
            })
            .catch(_err => null);
    }

    async create(spr: SprintPartReport): Promise<SprintPartReport | null> {
        return await pool.query<ISprintPartReport>(
            'insert into sprint_part_reports (member_name, report, sprint_part_id) values ($1, $2, $3) returning *',
            [spr.member_name, spr.report, spr.sprint_part_id]
        )
            .then(res => {
                if (res.rowCount > 0)
                    return new SprintPartReport(res.rows[0]);
                return null;
            })
            .catch(_err => null);
    }

    async update(spr: SprintPartReport): Promise<boolean> {
        return await pool.query<ISprintPartReport>(
            'update sprint_part_reports set report = $2 where member_name = $1 and sprint_part_id = $3 returning *',
            [spr.member_name, spr.report, spr.sprint_part_id]
        )
            .then(res => {
                return res.rowCount > 0;
            })
            .catch(_err => false);
    }

    async delete(spr: SprintPartReport): Promise<boolean> {
        return await pool.query<ISprintPartReport>(
            'delete from sprint_part_reports where member_name = $1 and sprint_part_id = $2 returning *',
            [spr.member_name, spr.sprint_part_id]
        )
            .then(res => {
                return res.rowCount > 0;
            })
            .catch(_err => false);
    }
}

const SprintPartReportDao = new SprintPartReportDaoClass();
export default SprintPartReportDao;

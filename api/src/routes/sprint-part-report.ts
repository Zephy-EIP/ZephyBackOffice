import SprintPartReportDao from '@/daos/SprintPartReport/SprintPartReportDao';
import SprintPartReport from '@/entities/SprintPartReport';
import authenticateWithRole from '@/shared/authentication/authenticateWithRole';
import createBasicResponse from '@/shared/basicResponse';
import { Router } from 'express';

const sprintPartReportRouter = Router();

sprintPartReportRouter.get('/list', authenticateWithRole(1000, async (_req, res) => {
    SprintPartReportDao.list().then(list => {
        res.json({sprList: list});
    });
}));

sprintPartReportRouter.post('/', authenticateWithRole(1000, async (req, res) => {
    const sprint_part_id = req.body.sprint_part_id;
    const report = req.body.report;
    const member_name = req.body.member_name;

    if (typeof sprint_part_id !== 'number' ||
        typeof report !== 'string' ||
        typeof member_name !== 'string')
        return res.status(400).json(createBasicResponse(400));

    const spr = new SprintPartReport({member_name, report, sprint_part_id});

    SprintPartReportDao.create(spr).then(value => {
        if (value === null)
            return res.status(500).json(createBasicResponse(500));
        res.status(200).json(createBasicResponse(200));
    });
}));

sprintPartReportRouter.put('/', authenticateWithRole(1000, async (req, res) => {
    const sprint_part_id = req.body.sprint_part_id;
    const report = req.body.report;
    const member_name = req.body.member_name;

    if (typeof sprint_part_id !== 'number' ||
        typeof report !== 'string' ||
        typeof member_name !== 'string')
        return res.status(400).json(createBasicResponse(400));

    const spr = new SprintPartReport({member_name, report, sprint_part_id});

    SprintPartReportDao.update(spr).then(value => {
        if (value === false)
            return res.status(500).json(createBasicResponse(500));
        res.status(200).json(createBasicResponse(200));
    });
}));

sprintPartReportRouter.delete('/', authenticateWithRole(1000, async (req, res) => {
    const sprint_part_id = req.body.sprint_part_id;
    const member_name = req.body.member_name;

    if (typeof sprint_part_id !== 'number' ||
        typeof member_name !== 'string')
        return res.status(400).json(createBasicResponse(400));

    const spr = new SprintPartReport({member_name, report: '', sprint_part_id});

    SprintPartReportDao.delete(spr).then(value => {
        if (value === false)
            return res.status(500).json(createBasicResponse(500));
        res.status(200).json(createBasicResponse(200));
    });
}));

export default sprintPartReportRouter;

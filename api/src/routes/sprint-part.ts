import SprintPartDao from '@/daos/SprintPart/SprintPartDao';
import authenticateWithRole from '@/shared/authentication/authenticateWithRole';
import { Router } from 'express';
import SprintPart from '@/entities/SprintPart';
import createBasicResponse from '@/shared/basicResponse';

const sprintPartRouter = Router();

sprintPartRouter.get('/list', authenticateWithRole(1000, (_req, res) => {
    SprintPartDao.list()
        .then(list => {
            res.json({sprintParts: list});
        });
}));

sprintPartRouter.post('/', authenticateWithRole(1000, (req, res) => {
    const sprint_name = req.body.sprint_name;
    const title = req.body.title;
    const description = req.body.description;
    const part_type = req.body.part_type;

    if (typeof sprint_name !== 'string' ||
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        (part_type !== 'KO' && part_type !== 'FU' && part_type !== 'D'))
        return res.status(400).json(createBasicResponse(400));

    let sprintPart = new SprintPart({sprint_name, title, description, type: part_type, id: 0});
    SprintPartDao.create(sprintPart)
        .then(part => {
            if (part === null)
                return res.status(500).json(createBasicResponse(500));
            res.json(createBasicResponse(200));
        });
}));

sprintPartRouter.put('/', authenticateWithRole(1000, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const id = req.body.id;

    if (typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof id !== 'number')
        return res.status(400).json(createBasicResponse(400));

    const sprintPart = await SprintPartDao.get(id);

    if (sprintPart === null)
        return res.status(404).json(createBasicResponse(404));

    sprintPart.title = title;
    sprintPart.description = description;

    SprintPartDao.update(sprintPart)
        .then(success => {
            if (!success)
                return res.status(400).json(createBasicResponse(400));
            res.json(createBasicResponse(200));
        });
}));

sprintPartRouter.delete('/', authenticateWithRole(1000, (req, res) => {
    const id = req.body.id;

    if (typeof id !== 'number')
        return res.status(400).json(createBasicResponse(400));

    SprintPartDao.delete(id)
        .then(success => {
            if (!success)
                return res.status(400).json(createBasicResponse(400));
            res.json(createBasicResponse(200));
        });
}));

export default sprintPartRouter;

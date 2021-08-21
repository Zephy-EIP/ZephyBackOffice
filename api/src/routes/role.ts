import Role from '@/entities/Role';
import RoleService from '@/services/roleService';
import authenticateWithRole from '@/shared/authentication/authenticateWithRole';
import createBasicResponse, { BasicResponse } from '@/shared/basicResponse';
import { Router } from 'express';

const router = Router();

type roleResponse = BasicResponse & { role: Role };
type roleListResponse = BasicResponse & { role_list: Role[] };

router.get('/list', authenticateWithRole(1000, (_req, res, _info) => {
    RoleService.list().then(list => {
        const message = createBasicResponse(200) as roleListResponse;
        message.role_list = list;
        res.json(message);
    });
}));

router.post('/', authenticateWithRole(0, async (req, res, info) => {
    const name = req.body.name;
    const importance = req.body.importance;
    if (typeof importance !== 'number' || typeof name !== 'string') {
        res.status(400).json(createBasicResponse(400));
        return;
    }
    const ret = await RoleService.createRole(info.user, importance, name);
    if (typeof ret === 'number') {
        res.status(ret).json(createBasicResponse(ret));
        return;
    }

    let message = createBasicResponse(200) as roleResponse;
    message.role = ret;
    res.json(message);
}));

router.put('/', authenticateWithRole(0, async (req, res, info) => {
    const name = req.body.name;
    const importance = req.body.importance;
    const id = req.body.role_id;
    if (typeof id !== 'number') {
        res.status(400).json(createBasicResponse(400));
        return;
    }
    if (importance === undefined && name === undefined) {
        res.status(400).json(createBasicResponse(400));
        return;
    }
    if (importance !== undefined && typeof importance !== 'number') {
        res.status(400).json(createBasicResponse(400));
        return;
    }
    if (name !== undefined && typeof name !== 'string') {
        res.status(400).json(createBasicResponse(400));
        return;
    }
    const ret = await RoleService.updateRole(info.user, id, importance, name);
    if (typeof ret === 'number') {
        res.status(ret).json(createBasicResponse(ret));
        return;
    }

    let message = createBasicResponse(200) as roleResponse;
    message.role = ret;
    res.json(message);
}));

router.delete('/', authenticateWithRole(0, async (req, res, info) => {
    const id = req.body.role_id;

    if (typeof id !== 'number') {
        res.status(400).json(createBasicResponse(400));
        return;
    }

    const code = await RoleService.deleteRole(info.user, id);

    res.json(code).json(createBasicResponse(code));

}));

export default router;

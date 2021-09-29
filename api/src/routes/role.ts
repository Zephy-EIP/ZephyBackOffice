import Role from '@/entities/Role';
import RoleService from '@/services/roleService';
import UserService from '@/services/userService';
import authenticateWithRole from '@/shared/authentication/authenticateWithRole';
import createBasicResponse, { BasicResponse } from '@/shared/basicResponse';
import { Router } from 'express';

const router = Router();

type RoleResponse = BasicResponse & { role: Role };
type RoleListResponse = BasicResponse & { role_list: Role[] };

router.get('/list', authenticateWithRole(1000, (_req, res, _info) => {
    RoleService.list().then(list => {
        const message = createBasicResponse(200) as RoleListResponse;
        message.role_list = list;
        res.json(message);
    });
}));

router.post('/', authenticateWithRole(0, async (req, res, info) => {
    let name = req.body.name;
    const importance = req.body.importance;

    if (typeof importance !== 'number' || typeof name !== 'string' || !UserService.usernameIsValid(name.trim())) {
        res.status(400).json(createBasicResponse(400));
        return;
    }
    name = name.trim();
    const ret = await RoleService.createRole(info.user, importance, name);
    if (typeof ret === 'number') {
        res.status(ret).json(createBasicResponse(ret));
        return;
    }

    let message = createBasicResponse(200) as RoleResponse;
    message.role = ret;
    res.json(message);
}));

router.put('/', authenticateWithRole(0, async (req, res, info) => {
    let name = req.body.name;
    const importance = req.body.importance;
    const id = req.body.role_id;
    if (typeof id !== 'number') {
        res.status(400).json(createBasicResponse(400));
        return;
    }
    if ((importance === undefined && name === undefined) ||
        (importance !== undefined && typeof importance !== 'number') ||
        (name !== undefined && typeof name !== 'string' && !UserService.usernameIsValid(name.trim()))) {
        res.status(400).json(createBasicResponse(400));
        return;
    }
    if (typeof name === 'string')
        name = name.trim();
    const ret = await RoleService.updateRole(info.user, id, name, importance);
    if (typeof ret === 'number') {
        res.status(ret).json(createBasicResponse(ret));
        return;
    }

    let message = createBasicResponse(200) as RoleResponse;
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

    res.status(code).json(createBasicResponse(code));

}));

export default router;

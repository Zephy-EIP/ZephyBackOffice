import AuthInfo from '@/shared/authentication/authInfo';
import express from 'express';
import { authenticate } from '@/shared/authentication/authentication';
import createBasicResponse from '@/shared/basicResponse';
import UserDao from '@/daos/User/UserDao';


export default function authenticateWithRole(minRoleImportance: number, func: (req: express.Request, res: express.Response, info: AuthInfo)=>void): express.RequestHandler {
    return authenticate(async (req, res, info) => {
        if (info.user.role_id === null) {
            res.status(403).json(createBasicResponse(403));
            return;
        }
        if (await UserDao.fillRole(info.user) === false) {
            res.status(404).json(createBasicResponse(404, 'Role not found'));
            return;
        }

        if (info.user.role!.importance > minRoleImportance) {
            res.status(403).json(createBasicResponse(403));
            return;
        }

        func(req, res, info);
    });
}

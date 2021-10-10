import AuthInfo from '@/shared/authentication/authInfo';
import express from 'express';
import { authenticate } from '@/shared/authentication/authentication';
import createBasicResponse from '@/shared/basicResponse';
import UserDao from '@/daos/User/UserDao';
import logger from '@/shared/logger';

export default function authenticateWithRole(
    minRoleImportance: number,
    func: (req: express.Request, res: express.Response, info: AuthInfo) => any
): express.RequestHandler{
    return authenticate(async (req, res, info) => {
        if (info.user.role_id === null)
            return res.status(403).json(createBasicResponse(403));

        if (await UserDao.fillRole(info.user) === false) {
            logger.err(`Error: Role with id ${info.user.role_id} was not found for user ${info.user.id}`);
            return res.status(404).json(createBasicResponse(404, 'Role not found'));
        }

        if (info.user.role!.importance > minRoleImportance)
            return res.status(403).json(createBasicResponse(403));

        func(req, res, info);
    });
}

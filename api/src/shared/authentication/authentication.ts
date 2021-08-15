import AuthInfo from '@/shared/authentication/authInfo';
import Session from '@/entities/Session';
import { verify, sign } from 'jsonwebtoken';
import express from 'express';
import SessionDao from '@/daos/Session/SessionDao';
import createBasicResponse from '@/shared/basicResponse';
import logger from '@/shared/logger';

export function checkPayload(payload: any): boolean {
    return typeof payload === 'object' &&
        payload != null &&
        typeof payload.user_id === 'number' &&
        typeof payload.session_id === 'number';
}

export function authenticate(func: (req: express.Request, res: express.Response, info: AuthInfo)=>void): express.RequestHandler {
    return async (req: express.Request, res: express.Response) => {
        let token = req.headers.authorization;
        if (typeof token !== 'string' || token == null) {
            res.status(401).json(createBasicResponse(401));
            return;
        }
        try {
            let info = await getAuthInfo(token);
            if (info == null) {
                res.status(401).json(createBasicResponse(401));
                return;
            }
            func(req, res, info);
        } catch(err) {
            logger.err(err);
            res.status(400).json(createBasicResponse(400));
        }
    };
}

export async function getAuthInfo(token: string): Promise<AuthInfo|null> {
    try {
        let payload = verify(token, process.env.JWT_KEY || "encryptionkey", {algorithms: ["HS512"]}) as any;

        if (!checkPayload(payload))
            return null;

        return await SessionDao.getAuthInfo(payload.user_id, payload.session_id);;
    } catch(err) {}
    return null;
}

export function createAuthToken(session: Session): string {
    const payload = {
        user_id: session.user_id,
        session_id: session.id,
    };
    return sign(payload, process.env.JWT_KEY || "encryptionkey", {algorithm: "HS512"});
}

import MemberService from '@/services/memberService';
import authenticateWithRole from '@/shared/authentication/authenticateWithRole';
import createBasicResponse from '@/shared/basicResponse';
import { Router } from 'express';

const memberRouter = Router();

memberRouter.get('/list', authenticateWithRole(1000, (_req, res) => {
    MemberService.list()
        .then(list => {
            res.json({memberList: list});
        });
}));

memberRouter.post('/', authenticateWithRole(1000, (req, res) => {
    const memberName = req.body.name;

    if (typeof memberName !== 'string')
        return res.status(400).json(createBasicResponse(400));
    MemberService.create(memberName)
        .then(success => {
            if (!success)
                return res.status(500).json(createBasicResponse(500));
            return res.json(createBasicResponse(200));
        })
}));

memberRouter.delete('/', authenticateWithRole(1000, (req, res) => {
    const memberName = req.body.name;

    if (typeof memberName !== 'string')
        return res.status(400).json(createBasicResponse(400));
    MemberService.deleteMember(memberName)
        .then(success => {
            if (!success)
                return res.status(500).json(createBasicResponse(500));
            return res.json(createBasicResponse(200));
        })
}));

export default memberRouter;

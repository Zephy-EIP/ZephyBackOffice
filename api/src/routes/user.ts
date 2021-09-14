import { authenticate } from '@/shared/authentication/authentication';
import { Router } from 'express';
import UserService from '@/services/userService';
import createBasicResponse from '@/shared/basicResponse';
import authenticateWithRole from '@/shared/authentication/authenticateWithRole';

const router = Router();

router.get('/', authenticate(async (_req, res, info) => {
    res.json({user: info.user.getSafeInfo()});
}));

router.post('/auth', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (typeof email !== 'string' || typeof password !== 'string')
        return res.status(400).json(createBasicResponse(400));

    UserService.authenticate(email, password).then(token => {
        if (token === undefined)
            return res.status(404).json(createBasicResponse(404));
        res.json({token: token});
    });
});

router.put('/password', authenticate((req, res, info) => {
    const newPassword = req.body.new_password;
    const oldPassword = req.body.old_password;

    if (typeof newPassword !== 'string' || typeof oldPassword !== 'string' || !UserService.passwordIsValid(newPassword)) {
        res.status(400).json(createBasicResponse(400));
        return;
    }

    UserService.changePassword(oldPassword, newPassword, info.user).then(code => {
        res.status(code).json(createBasicResponse(code));
    });
}));

router.delete('/auth', authenticate((_req, res, info) => {
    UserService.deleteSession(info.session).then(success => {
        res.json({success: success});
    });
}));

router.post('/register', authenticateWithRole(0, async (req, res, info) => {
    const email = req.body.email;
    const password = req.body.password;
    let username = req.body.username;
    const roleId = req.body.role_id;

    if (typeof username === 'string')
        username = username.trim();

    // check args
    if (typeof email !== 'string' || !UserService.emailIsValid(email) ||
        typeof password !== 'string' || !UserService.passwordIsValid(password) ||
        typeof username !== 'string' || !UserService.usernameIsValid(username) ||
        (typeof roleId !== 'number' && roleId !== null))
        return res.status(400).json(createBasicResponse(400));

    if (await UserService.userExists(email)) {
        res.status(409).json(createBasicResponse(409));
        return;
    }

    UserService.createAccount(email, password, username, roleId, info.user).then(result => {
        res.status(result).json(createBasicResponse(result));
    });
}));

router.put('/set-role', authenticateWithRole(10, async (req, res, info) => {
    let userIdOrMail = req.body.email;
    if (userIdOrMail === undefined)
        userIdOrMail = req.body.user_id;
    const desiredRole = req.body.role_id;

    if ((typeof userIdOrMail !== 'string' && typeof userIdOrMail !== 'number') || typeof desiredRole !== 'number') {
        res.status(400).json(createBasicResponse(400));
        return;
    }

    UserService.setRole(info.user, userIdOrMail, desiredRole).then(code => {
        res.status(code).json(createBasicResponse(code));
    });
}));

router.get('/list', authenticateWithRole(1000, (_req, res, _info) => {
    UserService.getList().then(list => {
        res.json({users: list});
    });
}));

router.get('/', authenticate((_req, res, info) => {
    res.json({user: info.user.getSafeInfo()});
}));

export default router;

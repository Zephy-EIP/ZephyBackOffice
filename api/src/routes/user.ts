import { authenticate } from '@/shared/authentication/authentication';
import { HTTP_ERROR_400, HTTP_ERROR_404, HTTP_ERROR_409 } from '@/shared/constants';
import { Router } from 'express';
import UserService from '@/services/userService';

const router = Router();

router.get('/', authenticate(async (_req, res, info) => {
    res.json({user: info.user.getSafeInfo()});
}));

router.post('/auth', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (typeof email !== 'string' || typeof password !== 'string')
        return res.status(400).json({error: HTTP_ERROR_400});

    UserService.authenticate(email, password).then(token => {
        if (token === undefined)
            return res.status(404).json({error: HTTP_ERROR_404});
        res.json({token: token});
    });
});

router.put('/password', authenticate((req, res, info) => {
    const newPassword = req.body.new_password;
    const oldPassword = req.body.old_password;

    if (typeof newPassword !== 'string' || typeof oldPassword !== 'string')
        res.status(400).json({error: HTTP_ERROR_400});

    UserService.changePassword(oldPassword, newPassword, info.user).then(success => {
        res.json({success: success});
    });
}));

router.delete('/auth', authenticate((_req, res, info) => {
    UserService.deleteSession(info.session).then(success => {
        res.json({success: success});
    });
}));

router.post('/register', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    if (typeof username === 'string')
        username = username.trim();

    // check args
    if (typeof email !== 'string' || !UserService.emailIsValid(email) ||
        typeof password !== 'string' || !UserService.passwordIsValid(password) ||
        typeof username !== 'string' || !UserService.usernameIsValid(username))
        return res.status(400).json({error: HTTP_ERROR_400});

    if (await UserService.userExists(email))
        return res.status(409).json({error: HTTP_ERROR_409});

    UserService.createAccount(email, password, username).then(success => {
        res.json({success: success});
    });
});

export default router;

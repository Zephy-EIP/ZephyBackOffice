import authenticateWithRole from '@/shared/authentication/authenticateWithRole';
import createBasicResponse from '@/shared/basicResponse';
import { Router } from 'express';

const sprintRouter = Router();

sprintRouter.post('/', authenticateWithRole(1000, (req, res, info): any => {

    try {
        const file = req.files?.sprintFile;
        if (file === undefined || Array.isArray(file))
            return res.status(400).json(createBasicResponse(400));

        const uploadPath = '/tmp/SprintFile' + info.user.id + '.csv';
        file.mv(uploadPath, err => {
            if (err)
                return res.status(500).json(createBasicResponse(500));
            console.log(err);
            console.log('Uploaded file, location: ' + uploadPath);
            return res.status(200).json(createBasicResponse(200));
        });
    } catch(_err) {
        return res.status(400).json(createBasicResponse(400));
    }

}));

export default sprintRouter;

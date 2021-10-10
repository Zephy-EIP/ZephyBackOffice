import SprintService from '@/services/sprintService';
import authenticateWithRole from '@/shared/authentication/authenticateWithRole';
import createBasicResponse from '@/shared/basicResponse';
import { Router } from 'express';

const sprintRouter = Router();

sprintRouter.post('/', authenticateWithRole(1000, (req, res, info): any => {

    const name = req.body.sprint_name;

    if (typeof name !== 'string' || name.length < 5)
        return res.status(400).json(createBasicResponse(400));

    try {
        const file = req.files?.sprintFile;
        if (file === undefined || Array.isArray(file) || file.mimetype !== 'text/csv')
            return res.status(400).json(createBasicResponse(400));

        const uploadPath = '/tmp/SprintFile' + info.user.id + '.csv';
        file.mv(uploadPath, err => {
            if (err)
                return res.status(500).json(createBasicResponse(500));

            SprintService.createSprintFromCSV(name, uploadPath)
                .then(result => {
                    if (result)
                        return res.status(200).json(createBasicResponse(200));
                    res.status(400).json(createBasicResponse(400));
                });

        });
    } catch(_err) {
        return res.status(400).json(createBasicResponse(400));
    }

}));

export default sprintRouter;

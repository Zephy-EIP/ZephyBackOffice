import authenticateWithRole from '@/shared/authentication/authenticateWithRole';
import { Router } from 'express';

const sprintRouter = Router();

sprintRouter.post('/', authenticateWithRole(1000, (res, req, info) => {
    
}));

export default sprintRouter;

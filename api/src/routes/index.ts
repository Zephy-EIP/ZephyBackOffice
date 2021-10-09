import { Router } from 'express';
import userRouter from '@/routes/user';
import roleRouter from '@/routes/role';
import sprintRouter from '@/routes/sprint';

const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/role', roleRouter);
baseRouter.use('/sprint', sprintRouter);

export default baseRouter;

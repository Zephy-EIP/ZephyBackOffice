import { Router } from 'express';
import userRouter from '@/routes/user';
import roleRouter from '@/routes/role';

const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/role', roleRouter);

export default baseRouter;

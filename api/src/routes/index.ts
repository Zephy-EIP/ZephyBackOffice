import { Router } from 'express';
import userRouter from '@/routes/user';

const baseRouter = Router();
baseRouter.use('/user', userRouter);
export default baseRouter;

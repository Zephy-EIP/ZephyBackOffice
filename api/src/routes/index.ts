import { Router } from 'express';
import userRouter from '@/routes/user';
import roleRouter from '@/routes/role';
import sprintRouter from '@/routes/sprint';
import changelogRouter from '@/routes/changelog';
import memberRouter from '@/routes/member';
import sprintPartRouter from '@/routes/sprint-part';
import sprintPartReportRouter from '@/routes/sprint-part-report';

const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/role', roleRouter);
baseRouter.use('/sprint', sprintRouter);
baseRouter.use('/changelog', changelogRouter);
baseRouter.use('/member', memberRouter);
baseRouter.use('/sprint-part', sprintPartRouter);
baseRouter.use('/sprint-part-report', sprintPartReportRouter);

export default baseRouter;

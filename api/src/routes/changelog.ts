import Changelog from '@/entities/Changelog';
import ChangelogService from '@/services/changelogService';
import authenticateWithRole from '@/shared/authentication/authenticateWithRole';
import createBasicResponse from '@/shared/basicResponse';
import { Router } from 'express';

const changelogRouter = Router();

changelogRouter.get('/list', authenticateWithRole(1000, (_req, res) => {
    ChangelogService.list().then(list => res.json({changelog: list}));
}));

changelogRouter.post('/', authenticateWithRole(1000, (req, res) => {
    const author = req.body.author;
    const version = req.body.version;
    const sections = req.body.sections;
    const comments = req.body.comments;

    if (typeof author !== 'string' || author.trim().length < 2 ||
        typeof version !== 'string' || version.trim().length < 1 ||
        typeof sections !== 'string' || sections.trim().length < 5 ||
        typeof comments !== 'string' || comments.trim().length < 5)
        return res.status(400).json(createBasicResponse(400));
    ChangelogService.create(author, version, sections, comments)
        .then(changelog => {
            if (changelog === null)
                return res.status(500).json(createBasicResponse(500));
            res.json({createLog: changelog});
        });
}));

changelogRouter.put('/', authenticateWithRole(1000, (req, res) => {
    const author = req.body.author;
    const version = req.body.version;
    const sections = req.body.sections;
    const comments = req.body.comments;
    const id = req.body.id;
    const date = req.body.date;

    if (typeof author !== 'string' || author.trim().length < 2 ||
        typeof version !== 'string' || version.trim().length < 1 ||
        typeof sections !== 'string' || sections.trim().length < 5 ||
        typeof comments !== 'string' || comments.trim().length < 5 ||
        typeof date !== 'string' ||
        typeof id !== 'number')
        return res.status(400).json(createBasicResponse(400));

    const cl = new Changelog({author, version, sections, comments, id, date});
    ChangelogService.update(cl)
        .then(success => {
            if (success === false)
                return res.status(500).json(createBasicResponse(500));
            res.json(createBasicResponse(200));
        });
}));

changelogRouter.delete('/', authenticateWithRole(1000, (req, res) => {
    const id = req.body.id;

    if (typeof id !== 'number')
        return res.status(400).json(createBasicResponse(400));

    ChangelogService.deleteChangelog(id)
        .then(success => {
            if (success === false)
                return res.status(500).json(createBasicResponse(500));
            res.json(createBasicResponse(200));
        });
}));

export default changelogRouter;

import ChangelogDao from '@/daos/Changelog/ChangelogDao';
import Changelog, { IChangelog } from '@/entities/Changelog';

namespace ChangelogService {
    export async function list(): Promise<Changelog[]> {
        return await ChangelogDao.list();
    }

    export async function create(author: string, version: string, sections: string, comments: string): Promise<Changelog | null> {
        const cl = new Changelog({author, version, sections, comments} as IChangelog);
        return await ChangelogDao.create(cl);
    }

    export async function update(changelog: Changelog): Promise<boolean> {
        return await ChangelogDao.update(changelog);
    }

    export async function deleteChangelog(id: number): Promise<boolean> {
        return await ChangelogDao.delete(new Changelog({ id } as IChangelog));
    }

}

export default ChangelogService;

import MemberDao from '@/daos/Member/MemberDao';
import SprintDao from '@/daos/Sprint/SprintDao';
import Sprint from '@/entities/Sprint';
import CSVDataHandler from '@/shared/pld/csvDataHandler';
import SprintData, { CSVEntry } from '@/shared/pld/dataType';
import csv from 'csvtojson';

namespace SprintService {

    export async function createSprintFromCSV(sprintName: string, filepath: string): Promise<boolean> {
        try {
            let sprintData = await csv().fromFile(filepath) as CSVEntry[] | null;
            const members = await MemberDao.list();
            sprintData = CSVDataHandler.validateData(sprintData!, members, sprintName);
            if (sprintData === null)
                return false;
            const data = CSVDataHandler.csvToSprintData(sprintData, members);
            return await SprintDao.add(sprintName, data);
        } catch(e) {
            console.error(e);
            return false;
        }
    }

    export async function updateSprintData(data: SprintData, sprintName: string): Promise<boolean> {
        return await SprintDao.updateData(sprintName, data) !== null;
    }

    export async function updateSprintName(oldName: string, newName: string): Promise<boolean> {
        return await SprintDao.updateName(oldName, newName) !== null;
    }

    export async function deleteSprint(sprintName: string): Promise<boolean> {
        return await SprintDao.delete(sprintName) !== null;
    }

    export async function list(): Promise<Sprint[]> {
        return await SprintDao.list();
    }

}

export default SprintService;

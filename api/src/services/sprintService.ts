import MemberDao from '@/daos/Member/MemberDao';
import SprintDao from '@/daos/Sprint/SprintDao';
import Sprint from '@/entities/Sprint';
import logger from '@/shared/logger';
import CSVDataHandler from '@/shared/pld/csvDataHandler';
import SprintData, { CSVEntry } from '@/shared/pld/dataType';
import csv from 'csvtojson';

namespace SprintService {

    async function extractSprintDataFormCSV(sprintName: string, filepath: string): Promise<SprintData | null> {
        try {
            let sprintData = await csv().fromFile(filepath) as CSVEntry[] | null;
            const members = await MemberDao.list();
            sprintData = CSVDataHandler.validateData(sprintData!, members, sprintName);
            if (sprintData === null)
                return null;
            return CSVDataHandler.csvToSprintData(sprintData, members);
        } catch(e) {
            logger.err(e);
            return null;
        }
    }

    export async function createSprintFromCSV(sprintName: string, filepath: string): Promise<boolean> {
        const data = await extractSprintDataFormCSV(sprintName, filepath);
        if (data === null)
            return false;
        return await SprintDao.add(sprintName, data);
    }

    export async function updateSprintFromCSV(sprintName: string, filepath: string): Promise<boolean> {
        const data = await extractSprintDataFormCSV(sprintName, filepath);
        if (data === null)
            return false;
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

    export async function listNames(): Promise<string[]> {
        return await SprintDao.listNames();
    }

}

export default SprintService;

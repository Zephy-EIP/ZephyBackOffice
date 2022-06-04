import MemberDao from '@/daos/Member/MemberDao';
import SprintDao from '@/daos/Sprint/SprintDao';
import Sprint from '@/entities/Sprint';
import logger from '@/shared/logger';
import CSVDataHandler from '@/shared/pld/csvDataHandler';
import SprintData, { CSVEntry } from '@/shared/pld/dataType';
import csv from 'csvtojson';

namespace SprintService {

    /**
       Return value is either the sprint data or the error string.
     */
    async function extractSprintDataFormCSV(sprintName: string, filepath: string): Promise<SprintData | string> {
        try {
            let sprintData = await csv().fromFile(filepath) as CSVEntry[] | null;
            const members = await MemberDao.list();
            let validation = CSVDataHandler.validateData(sprintData!, members, sprintName);
            if (validation.error !== undefined)
                return validation.error;
            sprintData = validation.entries!;
            return CSVDataHandler.csvToSprintData(sprintData, members);
        } catch(e) {
            logger.err(e);
            return '';
        }
    }

    export async function createSprintFromCSV(sprintName: string, filepath: string): Promise<{error: boolean, message?: string}> {
        const data = await extractSprintDataFormCSV(sprintName, filepath);
        if (typeof data === 'string')
            return {error: true, message: data};
        if (await SprintDao.add(sprintName, data))
            return {error: true, message: 'Sprint already exists'};
        return {error: false};
    }

    export async function updateSprintFromCSV(sprintName: string, filepath: string): Promise<{error: boolean, message?: string}> {
        const data = await extractSprintDataFormCSV(sprintName, filepath);
        if (typeof data === 'string')
            return {error: true, message: data};
        if (await SprintDao.updateData(sprintName, data))
            return {error: true, message: 'Server error'};
        return {error: false};
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

import MemberDao from '@/daos/Member/MemberDao';
import SprintDao from '@/daos/Sprint/SprintDao';
import Sprint from '@/entities/Sprint';
import logger from '@/shared/logger';
import CSVDataHandler from '@/shared/pld/csvDataHandler';
import SprintData, { CSVEntry } from '@/shared/pld/dataType';
import csv from 'csvtojson';

namespace SprintService {

    export async function createSprintFromCSV(sprintName: string, filepath: string): Promise<boolean> {
        logger.info(`Creating sprint '${sprintName}' from filepath '${filepath}'.`)
        try {
            const sprintData = await csv().fromFile(filepath) as CSVEntry[];
            const members = await MemberDao.list();
            if (!CSVDataHandler.validateData(sprintData, members, sprintName))
                return false;
        } catch {
            return false;
        }

        return true;
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

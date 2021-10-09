import SprintDao from '@/daos/Sprint/SprintDao';
import Sprint from '@/entities/Sprint';
import SprintData from '@/shared/pld/dataType';

namespace SprintService {

    export async function createSprintFromCSV(sprintName: string, filepath: string): Promise<boolean> {

        return false;
        // return await SprintDao.add(sprintName, data);
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

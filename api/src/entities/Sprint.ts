import SprintData, { emptySprintData } from '@/shared/pld/dataType';

export interface ISprint {
    sprint_name: string,
    data: SprintData,
}

export default class Sprint implements ISprint {
    sprint_name: string;
    data: SprintData;

    constructor(obj: ISprint) {
        this.sprint_name = typeof obj.sprint_name === 'string' ? obj.sprint_name : '';
        this.data = typeof obj.data === 'object' ? obj.data : emptySprintData;
    }
}

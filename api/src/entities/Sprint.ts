import SprintData, { emptySprintData } from '@/shared/pld/dataType';

export interface ISprint {
    sprint_name: string,
    data: string | SprintData,
}

export default class Sprint implements ISprint {
    sprint_name: string;
    data: SprintData = emptySprintData;

    constructor(obj: ISprint) {
        this.sprint_name = typeof obj.sprint_name === 'string' ? obj.sprint_name : '';

        if (typeof obj.data === 'string')
            this.data = JSON.parse(obj.data);
        else if (typeof obj.data === 'object')
            this.data = obj.data;
    }
}

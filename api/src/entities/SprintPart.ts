export interface ISprintPart {
    id: number;
    sprint_name: string,
    title: string,
    description: string,
    type: 'KO' | 'FU' | 'D' | '',
}

export default class SprintPart implements ISprintPart {
    id: number;
    sprint_name: string;
    title: string;
    description: string;
    type: 'KO' | 'FU' | 'D' | '';

    constructor(obj: ISprintPart) {
        this.id = typeof obj.id === 'number' ? obj.id : -1;
        this.sprint_name = typeof obj.sprint_name === 'string' ? obj.sprint_name : '';
        this.title = typeof obj.title === 'string' ? obj.title : '';
        this.description = typeof obj.description === 'string' ? obj.description : '';
        this.type = obj.type === 'D' || obj.type === 'FU' || obj.type === 'KO' ? obj.type : '';
    }
}

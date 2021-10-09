export interface ISprintPartReport {
    member_name: string,
    sprint_part_id: number,
    report: string,
}

export default class SprintPartReport implements ISprintPartReport {
    member_name: string;
    sprint_part_id: number;
    report: string;

    constructor(obj: ISprintPartReport) {
        this.member_name = typeof obj.member_name === 'string' ? obj.member_name : '';
        this.sprint_part_id = typeof obj.sprint_part_id === 'number' ? obj.sprint_part_id : -1;
        this.report = typeof obj.report === 'string' ? obj.report : '';
    }
}

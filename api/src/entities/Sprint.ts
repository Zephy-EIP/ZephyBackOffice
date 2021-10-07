export interface ISprint {
    sprint_name: string,
    data: any,
}

export default class Sprint implements ISprint {
    sprint_name: string;
    data: any;

    constructor(obj: ISprint) {
        this.sprint_name = typeof obj.sprint_name === 'string' ? obj.sprint_name : '';
        this.data = typeof obj.data === 'object' ? obj.data : null;
    }
}

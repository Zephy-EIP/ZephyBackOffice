export interface IMember {
    member_name: string,
}

export default class Member implements IMember {
    member_name: string;

    constructor(obj: IMember) {
        this.member_name = typeof obj.member_name === 'string' ? obj.member_name : '';
    }
}

export type StatusType = 'not started' | 'in progress' | 'done';

export interface MemberLoad {
    memberName: string;
    load: number;
    status: StatusType;
}

export interface UserStory {
    title: string;
    role: string;
    goal: string;
    description: string;
    dod: string[];
    load: number;
    status: StatusType;
    memberLoads: MemberLoad[];
}

export interface Deliverable {
    userStories: UserStory[];
    name: string;
}

export default interface SprintData {
    deliverables: Deliverable[];
}

export type CSVEntry = {
    Name: string,
    Status: string,
    Sprint: string,
    Livrable: string,
    'Sous-livrable': string,
    'Charge estimée (J/H)': string,
    'Assign to': string,
    'En tant que': string,
    'Je veux': string,
    Description: string,
    'Definition of Done': string,
}

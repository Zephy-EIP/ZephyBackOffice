export interface MemberLoad {
    memberName: string;
    load: number;
    status: 'not started' | 'in progress' | 'done';
}

export interface UserStory {
    title: string;
    role: string;
    goal: string;
    description: string;
    dod: string[];
    load: number;
    status: 'not started' | 'in progress' | 'done';
    memberLoads: MemberLoad[];
}

export default interface SprintData {
    userStories: UserStory[];
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

export const emptySprintData: SprintData = { userStories: [] };

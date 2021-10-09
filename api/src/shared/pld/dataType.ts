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

export const emptySprintData: SprintData = { userStories: [] };

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

export interface SprintData {
    deliverables: Deliverable[];
}

export default interface Sprint {
    sprint_name: string,
    data: SprintData,
}

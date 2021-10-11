export default interface SprintPart {
    id: number;
    sprint_name: string,
    title: string,
    description: string,
    type: 'KO' | 'FU' | 'D',
}

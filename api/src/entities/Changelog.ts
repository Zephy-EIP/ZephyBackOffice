export interface IChangelog {
    date: string;
    version: string;
    author: string;
    sections: string;
    comments: string;
    id: number;
}

export default class Changelog implements IChangelog {
    date: string;
    version: string;
    author: string;
    sections: string;
    comments: string;
    id: number;

    constructor(obj: IChangelog) {
        this.date = typeof obj.date === 'string' ? obj.date : '';
        this.version = typeof obj.version === 'string' ? obj.version : '';
        this.author = typeof obj.author === 'string' ? obj.author : '';
        this.sections = typeof obj.sections === 'string' ? obj.sections : '';
        this.comments = typeof obj.comments === 'string' ? obj.comments : '';
        this.id = typeof obj.id === 'number' ? obj.id : -1;
    }
}

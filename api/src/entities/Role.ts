
class Role {
    display_name: string;
    id: number;
    importance: number;

    /**
     * @param {any} obj
     * @property {string} obj.display_name
     * @property {number} obj.id
     * @property {number} obj.importance
     */
    constructor(obj?: any) {
        this.id = typeof obj?.id === 'number' ? obj.id : 0;
        this.display_name = typeof obj?.display_name === 'string' ? obj.display_name : '';
        this.importance = typeof obj?.importance === 'number' ? obj.importance : 0;
    }

};

export default Role;

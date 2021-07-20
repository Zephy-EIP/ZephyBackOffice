
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
        this.id = typeof obj?.id === 'number' ? obj.id : undefined || 0;
        this.display_name = typeof obj?.display_name === 'string' ? obj.display_name : undefined || '';
        this.importance = typeof obj?.importance === 'number' ? obj.importance : undefined || 0;
    }

};

export default Role;

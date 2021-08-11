import Role from '@/entities/Role';

type UserSafeInfo = {username: string, id: number, email: string};

class User {
    username: string;
    pass: string;
    salt: string;
    id: number;
    email: string;
    role_id: number;

    role?: Role;

    /**
     * @constructor User
     * @param {any} obj
     * @property {string} obj.username
     * @property {string} obj.email
     * @property {string} obj.pass
     * @property {string} obj.salt
     * @property {string | undefined} obj.id
     * @property {string | undefined} obj.role_id
     */
    constructor(obj?: any) {
        this.id = typeof obj?.id === 'number' ? obj.id : undefined || 0;
        this.username = typeof obj?.username === 'string' ? obj.username : undefined || '';
        this.email = typeof obj?.email === 'string' ? obj.email : undefined || '';
        this.pass = typeof obj?.pass === 'string' ? obj.pass : undefined || '';
        this.salt = typeof obj?.salt === 'string' ? obj.salt : undefined || '';
        this.role_id = typeof obj?.role_id === 'number' ? obj.role_id : undefined || 0;
    }

    getSafeInfo(): UserSafeInfo {
        return { username: this.username, id: this.id, email: this.email };
    }
}

export default User;

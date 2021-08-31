import Role from '@/entities/Role';

type UserSafeInfo = {username: string, id: number, email: string, role_id: number | null};

class User {
    username: string;
    pass: string;
    salt: string;
    id: number;
    email: string;
    role_id: number | null;

    role?: Role;

    /**
     * @constructor User
     * @param {any} obj
     * @property {string} obj.username
     * @property {string} obj.email
     * @property {string} obj.pass
     * @property {string} obj.salt
     * @property {number | undefined} obj.id
     * @property {number | null | undefined} obj.role_id
     */
    constructor(obj?: any) {
        this.id = typeof obj?.id === 'number' ? obj.id : 0;
        this.username = typeof obj?.username === 'string' ? obj.username : '';
        this.email = typeof obj?.email === 'string' ? obj.email : '';
        this.pass = typeof obj?.pass === 'string' ? obj.pass : '';
        this.salt = typeof obj?.salt === 'string' ? obj.salt : '';
        this.role_id = typeof obj?.role_id === 'number' ? obj.role_id : null;
    }

    getSafeInfo(): UserSafeInfo {
        return { username: this.username, id: this.id, email: this.email, role_id: this.role_id };
    }
}

export default User;

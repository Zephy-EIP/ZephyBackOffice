type UserSafeInfo = {username: string, id: number, email: string};

class User {
    username: string;
    pass: string;
    salt: string;
    id: number;
    email: string;

    constructor(obj?: any) {
        this.id = typeof obj?.id === 'number' ? obj.id : undefined || 0;
        this.username = typeof obj?.username === 'string' ? obj.username : undefined || '';
        this.email = typeof obj?.email === 'string' ? obj.email : undefined || '';
        this.pass = typeof obj?.pass === 'string' ? obj.pass : undefined || '';
        this.salt = typeof obj?.salt === 'string' ? obj.salt : undefined || '';
    }

    getSafeInfo(): UserSafeInfo {
        return { username: this.username, id: this.id, email: this.email };
    }
}

export default User;

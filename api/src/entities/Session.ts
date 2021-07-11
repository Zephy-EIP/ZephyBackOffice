class Session {
    id: number;
    user_id: number;

    constructor(obj?: any) {
        this.id = obj?.id || 0;
        this.user_id = obj?.user_id || 0;
    }
}

export default Session;

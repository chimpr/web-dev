export enum User_Type {
    STUDENT   = 0,
    RECRUITER = 1
}

export default class User {
    
    public uid: string;
    public type: User_Type;

    constructor(uid: string, type: User_Type) {
        this.uid  = uid;
        this.type = type;
    }
}
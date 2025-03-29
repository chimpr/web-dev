export enum Role {
    STUDENT   = 0,
    RECRUITER = 1
}

export default class User {
    
    public uid:         string;
    public role:        Role;
    public firstName:   string;
    public lastName:    string;
    public email:       string;

    constructor(uid: string, role: string, firstName: string, lastName: string, email: string) {
        this.uid  = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        switch(role) {
            case "Student":
                this.role = Role.STUDENT;
                break;
            case "Recruiter":
                this.role = Role.RECRUITER;
                break;
            default:
                this.role = Role.STUDENT;
                break;
        }
        this.email = email;
    }
}
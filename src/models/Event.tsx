export default class Event {
    
    public eid: string;
    public name: string;
    public date: string;
    public students: any[];

    constructor(eid: string, name: string, date: string, students: any[]) {
        this.eid  = eid;
        this.name = name;
        this.date = date;
        this.students = students;
    }
}
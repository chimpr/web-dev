import Candidate from "./Candidate";

export default class Event {
    
    public eid: string;
    public name: string;
    public date: string;
    public students: any[];
    public candidates: Candidate[];

    constructor(eid: string, name: string, date: string, students: any[]) {
        this.eid  = eid;
        this.name = name;
        this.date = date;
        this.students = students;
        this.candidates = [];
        students.forEach((s) => {
            this.candidates.push(new Candidate(s['Student_ID'], s['First_Name'], s['Last_Name'], s['Score']));
        });

    }
}
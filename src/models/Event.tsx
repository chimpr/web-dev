export default class Event {
    
    public eid: string;
    public name: string;
    public date: string;

    constructor(eid: string, name: string, date: string) {
        this.eid  = eid;
        this.name = name;
        this.date = date;
    }
}
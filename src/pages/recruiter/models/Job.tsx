export default class Job {
    
    public  jid:         string;
    public  title:       string;
    public  description: string;
    public  skills:      Array<string>;

    constructor(jid: string, title: string, description: string, skills: Array<string>) {
        this.jid         = jid;
        this.title       = title;
        this.description = description;
        this.skills      = skills;
    }


}
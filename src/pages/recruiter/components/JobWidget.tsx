import { Button } from "@mui/material";
import Job from "../models/Job";
import './style/JobWidget.css'
import JobIcon from './style/img/briefcase.png'

export default function JobWidget(props: any) {

    const handleJobSelect = () => {
        props.setSelectedJob(props.job);
    }

    return (<button onClick={handleJobSelect} className={"widget-body" + (props.selected ? " selected" : "")}>
                <div className="job-text">
                    <p className="header-txt">{props.job.title}</p>
                    <p>{props.job.description}</p>
                </div>
            </button>);    
}
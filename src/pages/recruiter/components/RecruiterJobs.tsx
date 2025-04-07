import { useEffect, useState } from 'react';
import './style/RecruiterJobs.css';
import Job from '../models/Job';
import JobWidget from './JobWidget';
import { Button, selectClasses } from '@mui/material';
import CandidateWidget from './CandidateWidget';
import PopupOverlay from '../../../components/PopupOverlay';
import RecruiterCreateJob from './RecruiterCreateJob';
import { deleteJob, getJobs } from '../../../api/api';
import JobSkillsWidget from './JobSkillsWidget';
import { error } from 'console';

export default function RecruiterJobs(props: any) {

    const [jobList, setJobList] = useState<Array<Job>>([]);
    const [selectedJob, setSelectedJob] = useState<Job>();
    const [createJobVisible, setCreateJobVisible] = useState(false);
    const [jobToEdit, setJobToEdit] = useState<Job>();

    const candidates = ["Jon","Josh","Jack","Jayman"]
    // example data is used for now.
    useEffect(() => {
      updateJobs();
    }, [createJobVisible === false]);

    const updateJobs = () => {
        const jList = new Array<Job>();
        getJobs(props.loggedInUser).then((res) => {
            if (res['Error'].trim() !== '') {
                console.log("Error while getting jobs: " + res['Error']);
                return;
            }
            const jobs = res.jobs;
            jobs.forEach((job: any) => {
                jList.push(new Job(job['_id'], job['Title'], 'Empty', job['Skills']));
            });
        }).finally(() => {
            setJobList([...jList]);
        });
    }

    /**
     * Handles job edit
     */
    const handleJobEditBtnClick = () => {
        setJobToEdit(selectedJob);
        setCreateJobVisible(true);
    } 

    const handleDeleteBtnClick = () => {
        if (selectedJob === undefined)
            return;
        deleteJob(selectedJob.jid).then((res) => {
            if (res["error"] !== "") {
                alert("Error deleting job: " + res["error"]);
            }
        }).finally(() => {updateJobs(); setSelectedJob(undefined);});
    }

    return (<div className="jobs-wrapper">
                <div className="jobs-ls">
                    <h1>Current Jobs</h1>
                    <Button onClick={() => {setJobToEdit(undefined); setCreateJobVisible(true)}} sx={{width: 'fit-content'}} variant='contained'>Create Job</Button>
                    <div className="jobs-scrollview">
                            {
                                jobList.map((job, idx) => (
                                    <JobWidget job={job} selected={job == selectedJob} setSelectedJob={setSelectedJob}/>
                                ))
                            }
                    </div>
                </div>
                <div className="jobs-rs">
                    {selectedJob === undefined ? 
                        <h1>Select A Job</h1>
                        :
                        <>
                            <h1>Selected Job</h1>
                            <div className='job-card'>
                                <h1>{selectedJob?.title}</h1>
                                <p>{selectedJob?.description}</p>
                                <p style={{fontWeight: "bold"}}>Skills</p>
                                <div className='job-skill-area'>
                                    <JobSkillsWidget skills={selectedJob?.skills} skillsEditable={false}/>
                                </div>
                                <Button onClick={handleJobEditBtnClick} variant='contained'>Edit</Button>
                                <Button onClick={handleDeleteBtnClick} sx={{backgroundColor: 'red'}}variant='contained'>Delete</Button>
                            </div>
                            <div className='job-card'>
                                <p style={{fontWeight: 'bold', marginTop: '1vh'}}>Top Candidates</p>
                                <div className='jobs-scrollview' style={{maxHeight: "22vh", gap: '1vh'}}>
                                    {
                                        candidates.map((c, i) => (
                                            <CandidateWidget name={c}/>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
                <PopupOverlay visible={createJobVisible} content={<RecruiterCreateJob setJobToEdit={setJobToEdit} loggedInUser={props.loggedInUser} jobToEdit={jobToEdit} setCreateJobVisible={setCreateJobVisible}/>}/>
            </div>);
}
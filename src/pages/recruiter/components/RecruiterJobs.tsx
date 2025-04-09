import { useEffect, useState } from 'react';
import './style/RecruiterJobs.css';
import Job from '../models/Job';
import JobWidget from './JobWidget';
import { Button, selectClasses } from '@mui/material';
import CandidateWidget from './CandidateWidget';
import PopupOverlay from '../../../components/PopupOverlay';
import RecruiterCreateJob from './RecruiterCreateJob';
import { deleteJob, getJobs, getStudent, getTopCandidates } from '../../../api/api';
import JobSkillsWidget from './JobSkillsWidget';
import Candidate from '../../../models/Candidate';
import StudentProfileView from '../../student/StudentProfileView';
import Student from '../../../models/Student';
import StudentProfileContainer from '../../student/StudentProfileContainer';

export default function RecruiterJobs(props: any) {

    const [jobList, setJobList] = useState<Array<Job>>([]);
    const [selectedJob, setSelectedJob] = useState<Job>();
    const [createJobVisible, setCreateJobVisible] = useState(false);
    const [jobToEdit, setJobToEdit] = useState<Job>();

    const [topCandidates, setTopCandidates] = useState<Candidate[]>([]);
    const [gettingTopCandidates, setGettingTopCandidates] = useState(false);
    const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
    const NUM_TOP_CANDIDATES = 5;
    
    // example data is used for now.
    useEffect(() => {
      updateJobs();
    }, [createJobVisible === false]);

    // hook for updating top candidates once a job is selected.
    useEffect(() => {
        if (selectedJob === undefined) {
            setTopCandidates([]);
            setGettingTopCandidates(false);
            return;
        }
        setGettingTopCandidates(true);
        // update top candidates.
        getTopCandidates(selectedJob.jid, NUM_TOP_CANDIDATES).then((res) => {
            if (res['Error'] !== '') {
                console.log("Error getting top candidates: " + res['Error']);
                setGettingTopCandidates(false);
                return;
            }

            const tC: Candidate[] = [];

            (res['Top_Candidates'] as any[]).forEach((c) => {
                tC.push(new Candidate(c['Student_ID'], c['First_Name'], c['Last_Name'], c['Score']));
            });
            setTopCandidates([...tC]);
        }).finally(() => {
            setGettingTopCandidates(false);
        });
    }, [selectedJob]);

    const SelectedCandidateView = () => {
        return <div className='recruiter-student-view-wrapper-outer'>
                    <div className='recruiter-student-view-wrapper-inner'>
                            <StudentProfileContainer recruiterViewID={viewingCandidate?.cid}/>
                    </div>
                    <Button onClick={() => setViewingCandidate(null)}>Done</Button>
               </div>
    }

    const updateJobs = () => {
        const jList = new Array<Job>();
        getJobs(props.loggedInUser).then((res) => {
            if (res['Error'].trim() !== '') {
                console.log("Error while getting jobs: " + res['Error']);
                return;
            }
            const jobs = res.jobs;
            jobs.forEach((job: any) => {
                jList.push(new Job(job['_id'], job['Title'], job['Description'], job['Skills']));
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
                                (jobList.length === 0) ? 
                                    <>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <h2>No Jobs!</h2>
                                        <Button onClick={() => {setJobToEdit(undefined); setCreateJobVisible(true);}}>Heal The Economy</Button>
                                        </div>
                                    </>
                                :
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
                                        gettingTopCandidates ?
                                        <> 
                                            <div style={{alignSelf: 'center'}} className='loader'/>
                                            <p style={{alignSelf: 'center'}}>Loading Top Candidates</p>
                                        </>
                                        :
                                            topCandidates.length === 0 ? 
                                                <p>No Candidates Found</p>
                                            :
                                                topCandidates.map((c, i) => (
                                                    <CandidateWidget setViewingCandidate={setViewingCandidate} key={i} candidate={c}/>
                                                ))
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
                <PopupOverlay visible={viewingCandidate !== null} content={viewingCandidate === null ? <></> : <SelectedCandidateView/>}/>
                <PopupOverlay visible={createJobVisible} content={<RecruiterCreateJob setJobToEdit={setJobToEdit} loggedInUser={props.loggedInUser} jobToEdit={jobToEdit} setCreateJobVisible={setCreateJobVisible}/>}/>
            </div>);
}
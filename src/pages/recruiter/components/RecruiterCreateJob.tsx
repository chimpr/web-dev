import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './style/RecruiterCreateJob.css';
import { useEffect, useState } from 'react';
import JobSkillsWidget from './JobSkillsWidget';
import { createJob, updateJob } from '../../../api/api';
import Job from '../models/Job';

export default function RecruiterCreateJob(props: any) {

    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [type, setType] = useState('Internship');
    const [busy, setBusy] = useState(false);

    const [isEditingJob, setIsEditingJob] = useState(false);
    const [editingJob, setEditingJob] = useState<Job|undefined>(props.jobToEdit);
    
    //determine if we're editing a job or not.
    useEffect(() => {
        const areEditing = props.jobToEdit instanceof Job;
        console.log(areEditing);
        setIsEditingJob(areEditing);
        if (!areEditing)
            return;
        // is a job
        const incomingJob = ({...props.jobToEdit} as Job);
        setEditingJob(incomingJob);
        setJobTitle(incomingJob.title);
        setSkills([...incomingJob.skills])
        setDescription(incomingJob.description);
    },[props.jobToEdit]);
    
    const jobInvalid = (jobTitle.trim() === '' || skills.length === 0 || description === '');
    const handleSelectionChange = (select: any) => {
        setType(select.target.value);
    }

    const handleCreateJobBtnClick = () => {
        // safety net, shouldn't get to this point without being valid unless user edits css.
        if (jobInvalid || props.loggedInUser === null)
            return;

        setBusy(true);

        // determine if we're creating or editing a job.
        if (isEditingJob && editingJob !== undefined) {
            console.log(editingJob.jid)
            updateJob(editingJob.jid, jobTitle, description, skills, type).then((res) => {
                console.log(res);
                if (res['Error'] !== '') {
                    alert("Error: " + res['Error']);
                    return;
                }
                clearOutFields();
                props.setCreateJobVisible(false);
            })
        } else {
            createJob(jobTitle,description, skills, type, props.loggedInUser?.uid).then((res) => {
                console.log(res);
                if (res['Error'] !== '') {
                    alert("Error: " + res['Error']);
                    return;
                }
                clearOutFields();
                props.setCreateJobVisible(false);
            });
        }
    }

    const clearOutFields = () => {
        // clear out fields.
        setJobTitle('');
        setSkills([]);
        setDescription('');
        setType('Internship')
        setIsEditingJob(false);
        props.setJobToEdit(undefined);
        setBusy(false);
    }

    // close window.
    const handleCancelBtnClick = () => {
        clearOutFields();
        props.setCreateJobVisible(false);
        
    }

    return <div className='create-job-content'>
                <div className='create-job-text-fields'>
                    <h1>{isEditingJob ? "Edit":"Create"} Job</h1>
                    <div className='text-buddies'>
                        <TextField value={jobTitle} onChange={(t) => setJobTitle(t.target.value)} required sx={{width: '50vw'}} label="Job Title"/>
                        <FormControl fullWidth>
                            <InputLabel required id="job-type-select-label">Job Type</InputLabel>
                            <Select
                                labelId="job-type-select-label"
                                id="job-type-select"
                                value={type}
                                label="Age"
                                onChange={handleSelectionChange}
                            >
                                <MenuItem value={"Internship"}>Internship</MenuItem>
                                <MenuItem value={"Apprenticeship"}>Apprenticeship</MenuItem>
                                <MenuItem value={"Salary"}>Salary</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <JobSkillsWidget skills={skills} setSkills={setSkills} skillsEditable={true}/>
                    <TextField value={description} onChange={(t) => setDescription(t.target.value)} multiline rows={2} required label="Job Description"></TextField>
                </div>
                <div className='create-job-button-area'>
                    <Button onClick={handleCancelBtnClick}>Cancel</Button>
                    <Button disabled={jobInvalid || busy} onClick={handleCreateJobBtnClick} variant='contained'>{isEditingJob ? "Save" : "Create"} Job</Button>
                </div>
            </div>
}
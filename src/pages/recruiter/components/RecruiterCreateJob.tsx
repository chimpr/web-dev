import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './style/RecruiterCreateJob.css';
import { useState } from 'react';
import JobSkillsWidget from './JobSkillsWidget';
import { createJob } from '../../../api/api';

export default function RecruiterCreateJob(props: any) {

    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [type, setType] = useState('Internship');
    const [busy, setBusy] = useState(false);
    
    const jobInvalid = (jobTitle.trim() === '' || skills.length === 0 || description === '');
    const handleSelectionChange = (select: any) => {
        setType(select.target.value);
    }

    const handleCreateJobBtnClick = () => {
        // safety net, shouldn't get to this point without being valid unless user edits css.
        if (jobInvalid || props.loggedInUser === null)
            return;

        setBusy(true);

        createJob(jobTitle, skills, type, props.loggedInUser?.uid).then((res) => {
            console.log(res);
            if (res['Error'] !== '') {
                alert("Error: " + res['Error']);
                return;
            }

            // clear out fields.
            setJobTitle('');
            setSkills([]);
            setDescription('');
            setBusy(false);
            props.setCreateJobVisible(false);
        });
    }

    // close window.
    const handleCancelBtnClick = () => {
        props.setCreateJobVisible(false);
    }

    return <div className='create-job-content'>
                <div className='create-job-text-fields'>
                    <h1>Create Job</h1>
                    <div className='text-buddies'>
                        <TextField onChange={(t) => setJobTitle(t.target.value)} required sx={{width: '50vw'}} label="Job Title"/>
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
                    <TextField onChange={(t) => setDescription(t.target.value)} multiline rows={2} required label="Job Description"></TextField>
                </div>
                <div className='create-job-button-area'>
                    <Button onClick={handleCancelBtnClick}>Cancel</Button>
                    <Button disabled={jobInvalid || busy} onClick={handleCreateJobBtnClick} variant='contained'>Create Job</Button>
                </div>
            </div>
}
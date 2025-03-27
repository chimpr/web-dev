import './style/student-sign-up.css';

import { Button, TextField } from "@mui/material";
import Logo from "./logo";
import { PageType } from '../MainIsland';
import InputFileUpload from './FileUpload';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

export default function StudentSignUp(props: any) {

    const handleGoBackBtnClick = () => {
        props.setCurPage(PageType.LOGIN);
    }

    const MAX_NUMBER_CHARS = 500;
    const [bioText, setBioText]           = useState('0');
    const [bioTextCount, setBioTextCount] = useState(0);

    return <>
             <div className='student-sign-up'>
                <Logo/>
                <div className='student-info'>
                    <div className="s-i-left">
                        <p className="header-text" style={{color: 'black'}}>Student Sign Up</p>
                        <p>General Information</p>
                        <div className='text-buddies'>
                            <TextField required style={{width: '50%'}} label="First Name"/>
                            <TextField required style={{width: '50%'}} label="Last Name"/>
                        </div>
                        <p>Contact Information</p>
                        <div className='text-buddies'>
                            <TextField required style={{width: '50%'}} label="Email"/>
                            <TextField required style={{width: '50%'}} label="Phone"/>
                        </div>

                        <p>Graduation Date</p>
                        <div className='text-buddies' style={{gap: '6%'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker />
                            </LocalizationProvider>
                            <InputFileUpload variant="outlined" id={"resume-upload"} text={"Upload Resume"} FileType={"application/pdf"}/>
                        </div>
                    </div>
                    <div className='s-i-right'> 
                        <p>{"Biography (" + String(bioTextCount) + "/" + String(MAX_NUMBER_CHARS) + ")"}</p>
                        <TextField
                            label="Bio (Optional)"
                            multiline
                            variant="outlined"
                            inputProps={{ maxLength: MAX_NUMBER_CHARS }}
                            minRows={8}
                            maxRows={8}
                            onChange={(i) => {setBioText(i.target.value); setBioTextCount(i.target.value.length)}}
                        />
                        <Button variant='contained' style={{width: '100%'}}>Register</Button>

                    </div>
                </div>
                <Button onClick={handleGoBackBtnClick} className='go-back-btn'>Go Back</Button>
             </div>
           </>
}
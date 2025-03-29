import Button from '@mui/material/Button';
import { PageType } from '../MainIsland';
import './style/recruiter-sign-up.css';
import Logo from './logo';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { signUpRecruiter } from '../api/api';

export default function RecruiterSignUp(props: any) {
    const handleGoBackBtnClick = () => {
        props.setCurPage(PageType.LOGIN);
    }

    const [showPassword, setShowPassword] = useState(false);
    const [emailText, setEmailText]       = useState('');
    const [passwordTxt, setPasswordTxt]   = useState('');
    const [firstNameTxt, setFirstNameTxt] = useState('');
    const [lastNameTxt, setLastNameTxt]   = useState('');
    const [linkedInTxt, setLinkedInTxt]   = useState('');
    const [companyTxt, setCompanyTxt]     = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [busy, setBusy]                 = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // todo?
    const linkedinRegex = /^http:\/\/(www\.)?linkedin\.com\/.*$/;


    const handleEmailType = (eTxt: string) => {
        setEmailText(eTxt);
        setEmailInvalid(!emailRegex.test(eTxt));
    }

    const signUp = () => {
        if (formNotFilled || busy)
            return;
        setBusy(true);
        signUpRecruiter(linkedInTxt,companyTxt,firstNameTxt,lastNameTxt,emailText,passwordTxt).then((res) => {
            if(res["Error"] !== '') {
                alert("Error: " + res["Error"])
                setBusy(false);
                return;
            }
            setBusy(false);
            alert("Succesfully Created Account!");
            props.setCurPage(PageType.LOGIN); 
        });
    }

    const formNotFilled = (emailText === '' || passwordTxt === '' || emailInvalid || firstNameTxt === '' || lastNameTxt === '' || companyTxt === '' || linkedInTxt === '')

    return <>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
                <div className="recruiter-sign-up">
                    <Logo/>
                    <div className='recruiter-sign-up-content'>
                        <h1>Recruiter Sign Up</h1>
                        <p>Sign Up Information</p>
                        <div style={{width: '100%'}}>
                            <TextField onChange={(t) => handleEmailType(t.target.value)} style={{width: "75%"}} required label="Email"/>                        
                            <p style={{color: 'red', display: (emailInvalid ? "" : "none")}}>Invalid email address!</p>
                        </div>
                        <div style={{width: '100%', marginTop: '1em', display:'flex', flexDirection: 'column'}}>
                            <TextField onChange={(t) => setPasswordTxt(t.target.value)} style={{width: "75%", alignSelf: 'top'}} required type={(showPassword) ? "" : "password"} label="Password"/>
                            <FormControlLabel label="Show Password" control={<Checkbox onChange={() => {setShowPassword(!showPassword)}}/>}/>
                        </div>
                        <p>Personal Information</p>
                        <div className='text-buddies'>
                            <TextField onChange={(t) => setFirstNameTxt(t.target.value)} required style={{width: '50%'}} label="First Name"/>
                            <TextField onChange={(t) => setLastNameTxt(t.target.value)} required style={{width: '50%'}} label="Last Name"/>
                        </div>
                        <p>Company Information</p>
                        <div className='text-buddies'>
                            <TextField onChange={(t) => setLinkedInTxt(t.target.value)} required style={{width: '50%'}} label="LinkedIn"/>
                            <TextField onChange={(t) => setCompanyTxt(t.target.value)} required style={{width: '50%'}} label="Company"/>
                        </div>
                    </div>

                    <Button onClick={signUp} disabled={formNotFilled || busy} style={{margin: '1em'}} variant='contained'>Register</Button>
                </div>
                <Button style={{alignSelf: 'flex-end left'}} onClick={handleGoBackBtnClick} className='go-back-btn'>Go Back</Button>

            </div>
        </>

}
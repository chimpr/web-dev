import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import {PageType} from '../MainIsland';
import Logo from './logo';
import BusinessMonkey from './style/img/businessman.png';
import RecruiterMonkey from './style/img/letter.png';
import StudentMonkey from './style/img/university.png';
import { useState } from 'react';
import {doLogin} from '../api/api';
import { useNavigate } from 'react-router-dom';
import './style/login.css';
import User from '../models/User';

export default function Login(props: any) {

    const [showPassword, setShowPassword] = useState(false);
    const [unPwIncorr, setUnPwIncorr]     = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [username, setUsername]         = useState('');
    const [password, setPassword]         = useState('');

    const [signUpCovered, setSignUpCovered] = useState(false);

    const navigate = useNavigate();
    const setLoggedInUser = props.setLoggedInUser;

    const checkEmail = (un: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailInvalid(!emailRegex.test(un));
    }

    const handleSetUsername = (email: string) => {
        checkEmail(email);
        setUsername(email);
    }

    /**
     * Performs the login operation.
     * @returns Nothing
     */
    const handleLoginBtnClick = () => {
        if (username === '' || password === '')
            return;
        doLogin(username, password).then((data) => {
            if (data["Error"] !== "") {
                setUnPwIncorr(true);
                return;
            }

            // determine if student or recruiter.
            const isStudent = data["Role"] === "Student";
            if (isStudent) {
                console.log("STUDENT!!")
            }
            
            // todo: remove me -- for testing purposes.

            const user = new User(data["ID"], "Recruiter", data["FirstName"], data["LastName"]);
            setLoggedInUser({...user});
            navigate("/home");
        })
    }

    const handleStudentSignUp = () => {
        console.log("Student Sign Up");
        props.setCurPage(PageType.SIGN_UP_STUDENT);
    }

    const handleRecruiterSignUp = () => {
        console.log("Recruiter Sign Up");
        props.setCurPage(PageType.SIGN_UP_RECRUITER);
    }

    return (
        <>                        
            <div className="login-main">
                <Logo />
                <div className='login-area'>
                    {/* Login */}
                    <p style={{color:'black', marginBottom: '0px'}} className='header-text'>Sign In</p>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <TextField onChange={(t) => handleSetUsername(t.target.value)} required id="username-field" style={{width: '20vw'}} label="Email" />
                        <p style={{display: (emailInvalid ? "" : "none"), "color":'red', margin: '0px'}}>Invalid Email Format</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <TextField onChange={(t) => setPassword(t.target.value)} required id="password-field" style={{width: '20vw'}} type={showPassword ? "" : "password"} label="Password" />
                        <p style={{display: (unPwIncorr ? "" : "none"), color: 'red', margin: '0px'}}>Incorrect Username or Password</p>
                        <FormControlLabel label="Show Password" control={<Checkbox onChange={() => {setShowPassword(!showPassword)}}/>}/>
                    </div>

                    <Button disabled={username === "" || password === "" || emailInvalid} onClick={handleLoginBtnClick} variant='contained' style={{width: '20vw'}}>Login</Button>
                    
                    {/* Or Sign Up */}
                    <p>Don't have an account?</p> 
                    <Button disabled={signUpCovered} onClick={() => {setSignUpCovered(true)}}>Sign Up</Button>
                </div>
            </div>
            <div className={"login-side"}>
                {/* Sign up area */}
                <div className="sign-up">
                    <p className='header-text' style={{color: 'black', marginBottom: '0px'}}>Sign Up</p>
                    <p style={{fontSize: '2vh'}}>Which Best Describes You?</p>
                    <Button style={{width: '70%', height: '25%'}} variant='contained' onClick={handleStudentSignUp}>
                        <div className='sign-up-btn'>
                            <img style={{height: '10vh', alignSelf: 'center'}} src={StudentMonkey}></img>
                            <p>I'm A Student</p>
                        </div>
                    </Button>
                    
                    <Button style={{width: '70%', height: '25%'}} variant='contained' onClick={handleRecruiterSignUp}>
                        <div className='sign-up-btn'>
                            <img style={{height: '10vh', alignSelf: 'center'}} src={RecruiterMonkey}></img>
                            <p>I'm A Recruiter</p>
                        </div>
                    </Button>
                    
                    <p>Change your mind?</p>
                    <Button onClick={() => setSignUpCovered(false)}>Go Back</Button>
                </div>
                
                {/* overlay */}
                <div className={"login-side-movable-div " + (!signUpCovered ? "" : ", transform")}>
                    <img className='login-business-monkey' src={BusinessMonkey}/>
                    <div style={{textAlign: 'center'}}>
                        <p className='header-text'>Welome To The Future of Recruiting</p>
                        <p>We put the fair in career fair</p>
                    </div>
                </div>
            </div>
        </>
    );
}
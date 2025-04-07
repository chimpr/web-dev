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
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [emailText, setEmailText]       = useState('');
    const [passwordTxt, setPasswordTxt]   = useState('');
    const [firstNameTxt, setFirstNameTxt] = useState('');
    const [lastNameTxt, setLastNameTxt]   = useState('');
    const [linkedInTxt, setLinkedInTxt]   = useState('');
    const [companyTxt, setCompanyTxt]     = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [busy, setBusy]                 = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password requirement states
    const passwordRules = {
        minLength: passwordTxt.length >= 8,
        hasLower: /[a-z]/.test(passwordTxt),
        hasUpper: /[A-Z]/.test(passwordTxt),
        hasNumber: /\d/.test(passwordTxt),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(passwordTxt),
    };

    const allPasswordValid = Object.values(passwordRules).every(Boolean);

    const handleEmailType = (eTxt: string) => {
        setEmailText(eTxt);
        setEmailInvalid(!emailRegex.test(eTxt));
    }

    const signUp = () => {
        if (formNotFilled || busy) return;

        setBusy(true);
        signUpRecruiter(linkedInTxt, companyTxt, firstNameTxt, lastNameTxt, emailText, passwordTxt).then((res) => {
            if (res["Error"] !== '') {
                alert("Error: " + res["Error"]);
                setBusy(false);
                return;
            }
            setBusy(false);
            alert("Successfully Created Account!");
            props.setCurPage(PageType.LOGIN);
        });
    }

    const formNotFilled = (
        emailText === '' ||
        passwordTxt === '' ||
        emailInvalid ||
        firstNameTxt === '' ||
        lastNameTxt === '' ||
        companyTxt === '' ||
        linkedInTxt === '' ||
        !allPasswordValid
    );

    // Helper for styling
    const passwordStyle = (isValid: boolean) => ({
        color: isValid ? 'green' : 'red',
        fontSize: '0.9em',
        margin: 0,
    });

    return (
        <div
        style={{
            width: '100%',
            marginTop: '1em',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className="recruiter-sign-up">
                <Logo />
                <div className="recruiter-sign-up-content"> 
                    <h1>Recruiter Sign Up</h1>
                    <p>Sign Up Information</p>

                    <div style={{ width: '100%'}}>
                        <TextField
                            onChange={(t) => handleEmailType(t.target.value)}
                            style={{ width: '75%' }}
                            required
                            label="Email"
                        />
                        <p style={{ color: 'red', display: emailInvalid ? '' : 'none' }}>Invalid email address!</p>
                    </div>

                    <div style={{ width: '100%', marginTop: '1em', display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            onChange={(t) => setPasswordTxt(t.target.value)}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            style={{ width: '75%', alignSelf: 'top' }}
                            required
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                        />
                        <FormControlLabel
                            label="Show Password"
                            control={
                                <Checkbox
                                    onChange={() => setShowPassword(!showPassword)}
                                    checked={showPassword}
                                />
                            }
                        />

                        {(passwordFocused || passwordTxt.length > 0) && (
                            <div style={{ marginTop: '0.5em', paddingLeft: '0.5em' }}>
                                <p style={passwordStyle(passwordRules.minLength)}>• At least 8 characters</p>
                                <p style={passwordStyle(passwordRules.hasLower)}>• One lowercase letter</p>
                                <p style={passwordStyle(passwordRules.hasUpper)}>• One uppercase letter</p>
                                <p style={passwordStyle(passwordRules.hasNumber)}>• One number</p>
                                <p style={passwordStyle(passwordRules.hasSpecial)}>• One special character</p>
                            </div>
                        )}
                    </div>

                    <p>Personal Information</p>
                    <div className="text-buddies">
                        <TextField
                            onChange={(t) => setFirstNameTxt(t.target.value)}
                            required
                            style={{ width: '50%' }}
                            label="First Name"
                        />
                        <TextField
                            onChange={(t) => setLastNameTxt(t.target.value)}
                            required
                            style={{ width: '50%' }}
                            label="Last Name"
                        />
                    </div>

                    <p>Company Information</p>
                    <div className="text-buddies">
                        <TextField
                            onChange={(t) => setLinkedInTxt(t.target.value)}
                            required
                            style={{ width: '50%' }}
                            label="LinkedIn"
                        />
                        <TextField
                            onChange={(t) => setCompanyTxt(t.target.value)}
                            required
                            style={{ width: '50%' }}
                            label="Company"
                        />
                    </div>
                </div>

                <Button
                    onClick={signUp}
                    disabled={formNotFilled || busy}
                    style={{ margin: '1em auto' }} /* Centers the button */
                    variant="contained"
                >
                    Register
                </Button>
               
                <Button
                    style={{ alignSelf: 'flex-start', margin: '1em' }}
                    onClick={handleGoBackBtnClick}
                    className="go-back-btn"
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
}
import './style/student-new.css';
import { Button, TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import Logo from "./logo";
import { PageType } from '../MainIsland';
import InputFileUpload from './FileUpload';
import useStudentSignUp, { type StudentSignUpHandlers } from './useStudentSignup';
import { useState } from 'react';

const MAX_BIO_CHARS = 300;

export default function StudentSignUp(props: any) {
  const { setCurPage } = props;
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    school,
    setSchool,
    gradSemester,
    setGradSemester,
    gradYear,
    setGradYear,
    bio,
    setBio,
    handleFileChange,
    error,
    bioCharCount,
    handleRegister
  } = useStudentSignUp(setCurPage);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleGoBackBtnClick = () => {
    setCurPage(PageType.LOGIN);
  };

  // Password requirement states
  const passwordRules = {
    minLength: password.length >= 8,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const allPasswordValid = Object.values(passwordRules).every(Boolean);

  // Helper for styling
  const passwordStyle = (isValid: boolean) => ({
    color: isValid ? 'green' : 'red',
    fontSize: '0.9em',
    margin: '0',
  });

  return (
    <div className='student-sign-up'>
      <Logo/>
      <p className="header-text" style={{color: 'black', margin: '40px 0 0 20px'}}>Student Sign Up</p>
      <div className='student-info'>
        <div className="s-i-left">
          <p>General Information</p>
          <div className='text-buddies'>
            <TextField 
              required 
              style={{width: '50%'}} 
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField 
              required 
              style={{width: '50%'}} 
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <p>Education Information</p>
          <TextField 
            required 
            fullWidth
            style={{margin: '0 0 12px 0'}} 
            label="School"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
          <div className='text-buddies'>
            <TextField
              required
              style={{width: '50%'}}
              label="Graduation Semester"
              select
              value={gradSemester}
              onChange={(e) => setGradSemester(e.target.value)}
            >
              <MenuItem value="Fall">Fall</MenuItem>
              <MenuItem value="Spring">Spring</MenuItem>
              <MenuItem value="Summer">Summer</MenuItem>
            </TextField>
            <TextField
              required
              style={{width: '50%'}}
              label="Graduation Year"
              type="number"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              inputProps={{ 
                min: new Date().getFullYear(), 
                max: new Date().getFullYear() + 5 
              }}
            />
          </div>
          <p>Account Information</p>
          <TextField
              required
              fullWidth
              style={{margin: '0 0 12px 0'}} 
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          <div className='text-buddies'>
            <TextField
              required
              style={{width: '50%'}}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              required
              fullWidth
              style={{width: '50%'}}
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          {/* Show Password */}
          <FormControlLabel
            label="Show Password"
            control={
              <Checkbox
                onChange={() => setShowPassword(!showPassword)}
                checked={showPassword}
              />
            }
          />
          
          {/* Password validation rules */}
          {(passwordFocused || password.length > 0) && (
            <div style={{ marginTop: '0.5em', paddingLeft: '0.5em' }}>
              <p style={passwordStyle(passwordRules.minLength)}>• At least 8 characters</p>
              <p style={passwordStyle(passwordRules.hasLower)}>• One lowercase letter</p>
              <p style={passwordStyle(passwordRules.hasUpper)}>• One uppercase letter</p>
              <p style={passwordStyle(passwordRules.hasNumber)}>• One number</p>
              <p style={passwordStyle(passwordRules.hasSpecial)}>• One special character</p>
            </div>
          )}
        </div>

        <div className='s-i-right'>
          <div>
            <p>{`Biography (${bioCharCount}/${MAX_BIO_CHARS})`}</p>
            <TextField
              fullWidth
              style={{margin: '0 0 12px 0'}} 
              label="Bio (Optional)"
              multiline
              variant="outlined"
              inputProps={{ maxLength: MAX_BIO_CHARS }}
              minRows={8}
              maxRows={8}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <InputFileUpload 
              id="resume-upload" 
              text="Upload Resume" 
              onUpload={handleFileChange}
          />
          {error && <div className="error-message">{error}</div>}
          <Button 
            variant='contained' 
            style={{width: '100%', margin: '12px 0 0 0'}}
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </div>
      <Button style={{margin: '25px'}} onClick={handleGoBackBtnClick} className='go-back-btn'>Go Back</Button>
    </div>
  );
}
import './style/student-sign-up.css';
import { Button, TextField, MenuItem } from "@mui/material";
import Logo from "./logo";
import { PageType } from '../MainIsland';
import InputFileUpload from './FileUpload';
import useStudentSignUp, { type StudentSignUpHandlers } from './useStudentSignup';

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

  const handleGoBackBtnClick = () => {
    setCurPage(PageType.LOGIN);
  };

  return (
    <div className='student-sign-up'>
      <Logo/>
      <div className='student-info'>
        <div className="s-i-left">
          <p className="header-text" style={{color: 'black'}}>Student Sign Up</p>
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
          <div className='text-buddies'>
            <TextField
              required
              style={{width: '50%'}}
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              style={{width: '50%'}}
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <TextField
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className='s-i-right'>
          <p>{`Biography (${bioCharCount}/${MAX_BIO_CHARS})`}</p>
          <TextField
            label="Bio (Optional)"
            multiline
            variant="outlined"
            inputProps={{ maxLength: MAX_BIO_CHARS }}
            minRows={8}
            maxRows={8}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <InputFileUpload 
              id="resume-upload" 
              text="Upload Resume" 
              onUpload={handleFileChange}
          />
          {/* Maybe delete this error message later */}
          {error && <div className="error-message">{error}</div>}
          <Button 
            variant='contained' 
            style={{width: '100%'}}
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </div>
      <Button onClick={handleGoBackBtnClick} className='go-back-btn'>Go Back</Button>
    </div>
  );
}
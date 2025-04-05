import './style/student-new.css';
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
            required
            fullWidth
            style={{width: '50%'}}
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>
          
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
          {/* Maybe delete this error message later */}
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
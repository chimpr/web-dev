import { useState } from 'react';
import { PageType } from '../MainIsland';
import { signUpStudent, uploadResume } from '../api/api';

const MAX_BIO_CHARS = 300;

export interface StudentSignUpHandlers {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  school: string;
  setSchool: React.Dispatch<React.SetStateAction<string>>;
  gradSemester: string;
  setGradSemester: React.Dispatch<React.SetStateAction<string>>;
  gradYear: string;
  setGradYear: React.Dispatch<React.SetStateAction<string>>;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  resumeFile: File | null;
  handleFileChange: (file: File) => void;
  error: string;
  bioCharCount: number;
  handleRegister: () => Promise<void>;
}

export default function useStudentSignUp(setCurPage: (page: PageType) => void): StudentSignUpHandlers {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');
  const [gradSemester, setGradSemester] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [bio, setBio] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const bioCharCount = bio.length;

  const handleFileChange = (file: File) => {
    setResumeFile(file);
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !school || !gradSemester || !gradYear) {
      setError('All required fields must be filled');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!resumeFile) {
      setError('Resume is required');
      return;
    }

    try {
      const signupResponse = await signUpStudent(
          school,
          gradSemester,
          parseInt(gradYear),
          bio,
          firstName,
          lastName,
          email,
          password
      );

      if (signupResponse.Error || !signupResponse.ID) {
          throw new Error(signupResponse.Error || 'Failed to create student account');
      }

      if (!resumeFile) {
          throw new Error('No resume file selected');
      }
      uploadResume(resumeFile, signupResponse.ID).then((res) => {
        if (res['Error'] !== '') {

        }
      })

      setCurPage(PageType.LOGIN);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return {
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
    resumeFile,
    handleFileChange,
    error,
    bioCharCount,
    handleRegister
  };
}
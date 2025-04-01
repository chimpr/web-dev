/**
 * This file will handle all api requests to the server.
 */

import axios, { AxiosError } from 'axios';

const baseApiURL = 'http://localhost:5001/api/';

const handleError = (msg: string): ApiResponse => ({
    Error: msg
  });


const baseAPIPostCall = async (data: any, path: string) => {
    try {
        const response = await axios.post(baseApiURL + path, data);
        console.log("Response status:", response.status); // Log the response status code

        if (response.status < 200 || response.status >= 300) {
            return handleError(response.data["error"]);
        }
        return response.data;
    } catch (err: any) {
        if (err.response) {
            return handleError(err.response.data["error"]);
        }
    }
}

/**
 * Logs user in.
 * @param email User email
 * @param password User password
 * @returns API Promised Login Response (JSON)
 */
export const doLogin = async (email: String, password: String) => {
    const data = {
        "email": email,
        "password": password
    };

   return await baseAPIPostCall(data, "login");
}

export const signUpRecruiter = async (linkedIn: string, company: string, firstName: string, lastName: string, email: string, password: string) => {
    const data = {
        "LinkedIn" : linkedIn,
        "Company"  : company,
        "FirstName": firstName,
        "LastName" : lastName,
        "Email"    : email,
        "Password" : password
    };
    return await baseAPIPostCall(data, "recruiter/signup");
}

interface ApiResponse<T = any> {data?: T; Error?: string;}

export const signUpStudent = async (school: string, gradSemester: string, gradYear: number, bio: string, firstName: string, lastName: string, email: string,password: string) => {
    const data = {
      School: school,
      Grad_Semester: gradSemester,
      Grad_Year: gradYear,
      Bio: bio,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password
    };
    return await baseAPIPostCall(data, "student/signup");
  };

export const uploadResume = async (file: File, userId: string) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', userId);
  
      const response = await axios.post(baseApiURL + "upload-resume", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return { data: response.data };
    } catch (err: any) {
      return handleError(err.response?.data?.error || err.message);
    }
};
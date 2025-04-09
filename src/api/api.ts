/**
 * This file will handle all api requests to the server.
 */

import axios, { AxiosError } from 'axios';
import User from '../models/User';
import { Dayjs } from 'dayjs';

const baseApiURL = 'http://chimprecruiter.online:5001/api/';

// Authorization
const getAuthHeaders = () => {
    const token = localStorage.getItem('Token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleError = (msg: String) => {
    const res = {
        "Error" : msg
    }
    return res;
} 

  const baseAPIPostCall = async (data: any, path: string) => {
    try {
        const response = await axios.post(baseApiURL + path, data, {
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
            });
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

const baseAPIGetCall = async (path: string) => {
    try {
        const response = await axios.get(baseApiURL + path, {
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
            });
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

const baseAPIPutCall = async (data: any, path: string) => {
    try {
        const response = await axios.put(baseApiURL + path, data, {
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
            });
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

const baseAPIDeleteCall = async (path: string) => {
    try {
        const response = await axios.delete(baseApiURL + path, {
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
            });
        console.log("Response status:", response.status); // Log the response status code

        if (response.status < 200 || response.status >= 300) {
            return handleError(response.data.error || 'Unknown error occurred');
        }
        return response.data;
    } catch (err: any) {
        if (err.response) {
            // Non-2xx status response
            const errorMessage = err.response.data.error || 'Unknown error occurred';
            return handleError(errorMessage);
        } else if (err.request) {
            // No response
            return handleError('Network error. Please check your connection.');
        } else {
            // Setup error
            return handleError(err.message || 'An unexpected error occurred');
        }
    }
};


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

export const createJob = async (title: string, description: string, skills: string[], type: string, recruiterID: string) => {
    const data = {
        "Title"         : title,
        "Skills"        : skills,
        "Description"   : description,
        "Type"          : type,
        "Recruiter_ID"  : recruiterID
    };
    return await baseAPIPostCall(data, "jobs/create");
}

/**
 * Updates a passed job in the DB.
 * @param jobID ID of Job
 * @param title Title of Job
 * @param skills List of skills
 * @param type Job type
 * @returns 
 */
export const updateJob = async(jobID: string, title: string, description: string, skills: string[], type: string) => {
    const data = {
        "id"    : jobID,
        "Title" : title,
        "Skills": skills,
        "Description" : description,
        "Type"  : type
    };
    return await baseAPIPutCall(data, "jobs/update");
}

export const deleteJob = async(jobID: string) => {
    return await baseAPIDeleteCall("jobs/delete/" + jobID);
}

export const getTopCandidates = async (jobID: string, numToGet: number) => {
    return await baseAPIGetCall('jobs/topcandidates/' + jobID + '/' + numToGet);
}

/**
 * Gets the jobs from a recruiter.
 * @param user Logged in user
 */
export const getJobs = async (user: User) => {
    return await(baseAPIGetCall("jobs/list/" + user.uid));
}

export const getEvents = async (user: User) => {
    return await(baseAPIGetCall('event/list/' + user.uid));
}

export const createEvent = async (user: User, name: string, date: Dayjs) => {
    const data = {
        "Name" : name,
        "Date" : date.format('MM-DD-YYYY'),
        "Recruiter_ID" : user.uid
    };

    return await baseAPIPostCall(data, 'events/create');
}

export const deleteEvent = async (eid: string) => {
    return await baseAPIDeleteCall('events/delete/' + eid);
}

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
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status < 200 || response.status >= 300) {
        return handleError(response.data["error"]);
      }
      return response.data;
    } catch (err: any) {
      return handleError(err.response?.data?.error);
    }
};

interface StudentResponse {
    _id: string;
    FirstName: string;
    LastName: string;
    School: string;
    Grad_Semester: string;
    Grad_Year: number;
    Bio: string;
    Email: string;
    Job_Performance?: [number, string];
    Error?: string;
}

export const getStudent = async (id: string): Promise<StudentResponse> => {
    return await baseAPIGetCall('student/' + id);
};
  
export const updateStudent = async (data: any) => {
    try {
        const response = await axios.put(`${baseApiURL}student/update`, data, {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err: any) {
        return handleError(err.response?.data?.error || 'Update failed');
    }
};

export const getResume = async (userID: string) => {
    return await baseAPIGetCall('resumes/' + userID);
};

export const updateResume = async (file: File, userId: string) => {
    try {
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('userId', userId);
        
        const response = await axios.put(baseApiURL + "update-resume", formData, {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response.data;
    } catch (err: any) {
        return handleError(err.response?.data?.error || err.message);
    }
};
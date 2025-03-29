/**
 * This file will handle all api requests to the server.
 */

import axios, { AxiosError } from 'axios';

const baseApiURL = 'http://localhost:5001/api/';

const handleError = (msg: String) => {
    const res = {
        "Error" : msg
    }
    return res;
} 

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

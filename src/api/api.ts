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

    try {
        const response = await axios.post(baseApiURL + "login", data);
        console.log("Response status:", response.status); // Log the response status code

        if (response.status !== 200) {
            return handleError(response.data["Error"]);
        }
        return response.data;
    } catch (err: any) {
        if (err.response) {
            return handleError(err.response.data["Error"]);
        }
    }
}

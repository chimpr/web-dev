/**
 * This file will handle all api requests to the server.
 */

import axios from 'axios';

export const doLogin = async (username: String, password: String) => {
    try {
        // todo implement axios request for login
        console.log("Username: " + username + " Password: " + password);
        return username;
    } catch(err) {
        throw new Error("Error encountered during login");
    }
}


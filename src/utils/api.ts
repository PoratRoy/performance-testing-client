import { DEFAULT_URL } from "./constants";

const baseURL = process.env.REACT_APP_SERVER_URL || DEFAULT_URL;

const request = async (endpoint: string = '') => {
    const response = await fetch(`${baseURL}${endpoint}`);
    return response.json();
};

export const requestGetResponseTime = () => {
    return request();
}
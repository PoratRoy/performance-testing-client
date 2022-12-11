
const baseURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000/';

const _request = async (endpoint: string = '') => {
    const response = await fetch(`${baseURL}${endpoint}`);
    return response.json();
};

export const requestGetResponseTime = () => {
    return _request();
}
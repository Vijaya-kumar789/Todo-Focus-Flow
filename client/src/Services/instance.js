import axios from 'axios';
import { BACKEND_API } from '../../utility/config';
// define the base url for the API
const baseURL = BACKEND_API;

// create an axios instance
const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const protectedInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export { instance, protectedInstance };
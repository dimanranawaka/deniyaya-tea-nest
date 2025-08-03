import axios from 'axios';

// Create a new instance of axios
const api = axios.create({
    baseURL: 'http://localhost:5000' // Your backend server URL
});

// Use an interceptor to add the auth token to every request
// This logic runs before any request is sent from the components that use this instance.
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            // If a token exists, add it to the Authorization header.
            // The 'Bearer ' prefix is the standard for JWT.
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // This handles errors that occur during the request setup.
        return Promise.reject(error);
    }
);

export default api;
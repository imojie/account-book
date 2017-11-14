import config from '../config/config.json';
import axios from 'axios';

export const getAccessToken = () => {
    let localUser = localStorage.getItem('user');
    let user = localUser ? JSON.parse(localUser) : {};
    let accessToken = '';
    if (user && user.token && user.token.access_token) {
        accessToken = user.token.access_token;
    }
    return accessToken;
};

export const login = (email, password) => {
    return axios.post(config.api_url + 'passport/login', {email, password});
};
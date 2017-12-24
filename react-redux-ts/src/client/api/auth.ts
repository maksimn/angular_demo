import axios from 'axios';
import UserRegistrationInput from '../../app/models/UserRegistrationInput';
import UserDataInput from '../../app/models/UserDataInput';
import UserView from '../../app/models/UserView';

export const registerUserApi = (registrationData: UserRegistrationInput) => {
    return axios.post('/register', registrationData).then(response => (response.data.name));
};

export const loginUserApi = (loginData: UserDataInput) => {
    return axios.post('/login', loginData).then(response => (response));
};

export const authenticateUserApi = () => {
    return axios.get('/auth').then(res => (<UserView> res.data));
};

export const logoutUserApi = () => {
    return axios.post('/logout').then(response => ({}));
};
import axios from 'axios';
import UserRegistrationInput from '../../app/models/UserRegistrationInput';
import UserDataInput from '../../app/models/UserDataInput';

export const registerUserApi = (registrationData: UserRegistrationInput) => {
    return axios.post('/register', registrationData).then(response => (response.data.name));
};

export const loginUserApi = (loginData: UserDataInput) => {
    return axios.post('/login', loginData).then(response => (response));
};
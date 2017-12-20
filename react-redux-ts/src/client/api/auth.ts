import axios from 'axios';
import UserRegistrationInput from '../../app/models/UserRegistrationInput';

export const registerUserApi = (registrationData: UserRegistrationInput) => {
    return axios.post('/register', registrationData).then(response => (response.data.name));
};
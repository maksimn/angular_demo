/// <reference types="axios" />
import axios from 'axios';

import {
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR
} from './constants';
import RegistrationData from '../interfaces/RegistrationData';

export const submitRegistrationData = (registrationData: RegistrationData) => {
    return (dispatch: any) => {
        dispatch({type: REGISTRATION_START, registrationData});
        axios.post('/register', registrationData).then(response => {
            const {username} = response.data;

            dispatch({type: REGISTRATION_SUCCESS, response});
            alert(`Пользователь ${username} успешно зарегистрирован.`);
        }).catch(error => {
            dispatch({type: REGISTRATION_ERROR, error});
        });
    };
};
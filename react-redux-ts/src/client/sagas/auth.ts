import { call, put, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import UserRegistrationInput from '../../app/models/UserRegistrationInput';
import ValidationErrors from '../../app/models/ValidationErrors';
import { authActionCreators } from '../actions/authorization';
import { REGISTRATION_START } from '../actions/constants';
import { registerUserApi } from '../api/auth';

export function* registerUser(registrationData: UserRegistrationInput) {
    try {
        const username = yield call(registerUserApi, registrationData);
        yield put(authActionCreators.registrationSuccess(username));
        alert(`Пользователь ${username} успешно зарегистрирован.`);
        yield put(push('/login'));
    }
    catch (error) {
        const validationErrors = <ValidationErrors> error.response.data.validationErrors;
        yield put(authActionCreators.registrationError(validationErrors));
    }
}

export function* watchRegisterUser(): any {
    while (true) {
        const action = yield take(REGISTRATION_START);
        yield registerUser(action.payload);
    }
}
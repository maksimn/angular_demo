import { call, put, take, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Cookies from 'js-cookie';
import UserRegistrationInput from '../../app/models/UserRegistrationInput';
import ValidationErrors from '../../app/models/ValidationErrors';
import { authActionCreators } from '../actions/authorization';
import { REGISTRATION_START, LOGIN_START, LOGOUT_START } from '../actions/constants';
import { registerUserApi, loginUserApi, logoutUserApi } from '../api/auth';
import UserDataInput from '../../app/models/UserDataInput';
import UserView from '../../app/models/UserView';

export function* logoutUser() {
    try {
        yield call(logoutUserApi);
        Cookies.remove('x-auth');
        yield put(authActionCreators.logoutSuccess());
        yield put(push('/'));
    } catch {
        yield put(authActionCreators.logoutError());
    }
}

export function* watchLogoutUser(): any {
    yield takeEvery(LOGOUT_START, logoutUser);
}

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

export function* loginUser(loginData: UserDataInput) {
    try {
        const response = yield call(loginUserApi, loginData);
        const user = <UserView> response.data;
        user.token = response.headers['x-auth'];
        Cookies.set('x-auth', user.token, { expires: 14 });
        yield put(authActionCreators.loginSuccess(user));
        yield put(push('/photos'));
    }
    catch (error) {
        const validationErrors = <ValidationErrors> error.response.data.validationErrors;
        yield put(authActionCreators.loginError(validationErrors));
    }
}

export function* watchLoginUser(): any {
    while (true) {
        const action = yield take(LOGIN_START);
        yield loginUser(action.payload);
    }
}

/// <reference types="react" />
/// <reference types="react-redux" />
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {submitRegistrationData} from "../actions/authorization";
import RegistrationData from '../interfaces/RegistrationData';
import ValidationErrors from '../components/ValidationErrors';

class RegisterForm extends React.Component<any, RegistrationData> {
    constructor(props: any){
        super(props);
    }

    componentWillMount() {
        this.setState({
            username: '',
            password: '',
            confirmPassword: ' '
        });
    }

    onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, username: event.target.value});
    }

    onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, password: event.target.value});
    }

    onConfirmPasswordChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, confirmPassword: event.target.value});
    }
    
    onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.dispatch(submitRegistrationData(this.state));
    }

    render() {
        const { 
            onUsernameChange, 
            onPasswordChange, 
            onConfirmPasswordChange, 
            onFormSubmit
        } = this;
        const {validationErrors} = this.props;

        return (
            <div className="col-lg-3 col-lg-offset-4">
                <h3>Регистрация</h3>
                <form id="registerForm" method="post" action="register"
                      onSubmit={ onFormSubmit }>
                    <div className="form-group">
                        <label htmlFor="username">Имя:</label>
                        <input type="text" className="form-control" name="username" id="username"
                               onChange={ onUsernameChange } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль:</label>
                        <input type="password" className="form-control" name="password" id="password"
                               onChange={ onPasswordChange } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Повторить пароль:</label>
                        <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" 
                               onChange={ onConfirmPasswordChange } />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Отправить
                    </button>
                    <Link className="btn btn-success" to="/login">Войти</Link>
                    
                    <ValidationErrors validationErrors={ validationErrors } />

                </form>
            </div>
        );
    }
}

export default connect((state: any) => ({ validationErrors: state.validation }))(RegisterForm);
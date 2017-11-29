import * as React from 'react';
import { Link } from 'react-router-dom';
import ValidationFieldError from '../../app/validate/ValidationFieldError';
import ValidationErrors from '../components/ValidationErrors';

export interface RegisterFormProps {
    onUsernameChange: (username: string) => void,
    onPasswordChange: (password: string) => void,
    onConfirmPasswordChange: (confirmPassword: string) => void,
    onFormSubmit: () => void,
    validationErrors: ValidationFieldError[]
}

const RegisterForm: React.StatelessComponent<RegisterFormProps> = (props) => {
    const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onUsernameChange(event.target.value);
    },
    onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onPasswordChange(event.target.value);
    },
    onConfirmPasswordChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onConfirmPasswordChange(event.target.value);
    },    
    onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onFormSubmit();
    },
    {validationErrors} = props;

    return (
        <div className="col-lg-3 col-lg-offset-4">
            <h3>Регистрация</h3>
            <form id="registerForm" method="post" action="register"
                onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Имя:</label>
                    <input type="text" className="form-control" name="username" id="username"
                        onChange={onUsernameChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" className="form-control" name="password" id="password"
                        onChange={onPasswordChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Повторить пароль:</label>
                    <input type="password" className="form-control" name="confirmPassword" id="confirmPassword"
                        onChange={onConfirmPasswordChange} />
                </div>
                <button type="submit" className="btn btn-primary">Отправить</button>

                <Link className="btn btn-success" to="/login">Войти</Link>

                <ValidationErrors validationErrors={validationErrors} />
            </form>
        </div>
    );
};

export default RegisterForm;
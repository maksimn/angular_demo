import * as React from 'react';
import { Link } from 'react-router-dom';
import ValidationFieldError from '../../app/validate/ValidationFieldError';
import ValidationErrors from '../components/ValidationErrors';

export interface LoginFormProps {
    onUsernameChange: (username: string) => void,
    onPasswordChange: (password: string) => void,
    onFormSubmit: () => void,
    validationErrors: ValidationFieldError[]
}

const LoginForm: React.StatelessComponent<LoginFormProps> = props => {
    const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onUsernameChange(event.target.value);
    },
    onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onPasswordChange(event.target.value);
    },    
    onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onFormSubmit();
    },
    {validationErrors} = props;
    
    return (
        <div className="col-lg-3 col-lg-offset-4">
            <h3>Вход в систему</h3>
            <form id="loginForm" method="post" action="login" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Имя:</label>
                    <input type="text" className="form-control" id="username" name="username" 
                        onChange={onUsernameChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" className="form-control" id="password" name="password" 
                        onChange={onPasswordChange} />
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>

                <Link className="btn btn-success" to="/register">Регистрация</Link>

                <ValidationErrors validationErrors={validationErrors} />
            </form>
        </div>
    );
}
    

export default LoginForm;
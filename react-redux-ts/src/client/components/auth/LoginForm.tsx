import * as React from 'react';
import { Link } from 'react-router-dom';
import ValidationErrorsModel from '../../../app/models/ValidationErrors';
import ValidationErrors from './ValidationErrors';

export interface LoginFormProps {
    onChange: (name: string, value: string) => void;
    onFormSubmit: () => void;
    validationErrors: ValidationErrorsModel;
}

const LoginForm: React.StatelessComponent<LoginFormProps> = props => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.name, event.target.value);
    },
    onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onFormSubmit();
    },
    { validationErrors } = props;

    return (
        <div className="col-lg-3 col-lg-offset-4">
            <h3>Вход в систему</h3>
            <form id="loginForm" method="post" action="login" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Имя:</label>
                    <input type="text" className="form-control" id="username" name="username"
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" className="form-control" id="password" name="password"
                        onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Войти</button>

                <Link className="btn btn-success" to="/register">Регистрация</Link>

                <ValidationErrors validationErrors={ validationErrors } />
            </form>
        </div>
    );
};

export default LoginForm;
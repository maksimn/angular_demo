import * as React from 'react';
import { Link } from 'react-router-dom';
import ValidationErrorsModel from '../../../app/models/ValidationErrors';
import ValidationErrors from './ValidationErrors';

export interface RegisterFormProps {
    onChange: (name: string, value: string) => void;
    onFormSubmit: () => void;
    validationErrors: ValidationErrorsModel;
}

const RegisterForm: React.StatelessComponent<RegisterFormProps> = (props) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.name, event.target.value);
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
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" className="form-control" name="password" id="password"
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Повторить пароль:</label>
                    <input type="password" className="form-control" name="confirmPassword" id="confirmPassword"
                        onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Отправить</button>

                <Link className="btn btn-success" to="/login">Войти</Link>

                <ValidationErrors validationErrors={ validationErrors } />
            </form>
        </div>
    );
};

export default RegisterForm;
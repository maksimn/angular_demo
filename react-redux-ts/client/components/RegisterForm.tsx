import * as React from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => 
    <div className="col-lg-3 col-lg-offset-4">
        <h3>Регистрация</h3>
        <form id="registerForm" method="post" action="register">
            <div className="form-group">
                <label htmlFor="username">Имя:</label>
                <input type="text" className="form-control" name="username" id="username" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input type="password" className="form-control" name="password" id="password" />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Повторить пароль:</label>
                <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" />
            </div>
            <button type="submit" className="btn btn-primary">Отправить</button>
            <Link className="btn btn-success" to="/login">Войти</Link>
            <div id="validationErrors" className="alert alert-danger hidden" />
        </form>
    </div>;

export default RegisterForm;
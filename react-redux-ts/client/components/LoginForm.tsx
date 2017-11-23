import * as React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => 
    <div className="col-lg-3 col-lg-offset-4">
        <h3>Вход в систему</h3>
        <form id="loginForm" method="post" action="login">
            <div className="form-group">
                <label htmlFor="username">Имя:</label>
                <input type="text" className="form-control" id="username" name="username" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input type="password" className="form-control" id="password" name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Войти</button>
            <Link className="btn btn-success" to="/register">Регистрация</Link>
            <div id="validationErrors" className="alert alert-danger hidden" />
        </form>
    </div>;

export default LoginForm;
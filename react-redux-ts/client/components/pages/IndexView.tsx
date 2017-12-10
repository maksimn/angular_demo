import * as React from 'react';
import { Link } from 'react-router-dom';

const IndexView = (): JSX.Element => <
    div className="col-lg-4 col-lg-offset-4">
        <h3>Страницы приложения</h3>
        <ul className="nav navbar">
            <li>
                <Link to="register">Форма регистрации пользователя.</Link>
            </li>
            <li>
                <Link to="login">Форма логина пользователя.</Link>
            </li>
            <li>
                <Link to="photos">Фотографии.</Link>
            </li>
            <li>
                <Link to="profile">Профиль пользователя.</Link>
            </li>
        </ul>
    </div>;

export default IndexView;
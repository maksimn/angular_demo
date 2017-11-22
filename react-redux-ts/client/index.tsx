import * as React from "react";
import * as ReactDOM from "react-dom";

const IndexPage = () => <div>
    <div className="container-fluid bg-primary">
        <h2 className="text-white">TypeScript Демо</h2>
    </div>
    <div className="col-lg-4 col-lg-offset-4">
        <h3>Страницы приложения</h3>
        <ul className="nav navbar">
            <li>
                <a href="register">Форма регистрации пользователя.</a>
            </li>
            <li>
                <a href="login">Форма логина пользователя.</a>
            </li>
            <li>
                <a href="photos">Фотографии.</a>
            </li>
            <li>
                <a href="profile">Профиль пользователя.</a>
            </li>
        </ul>
    </div>
</div>;

ReactDOM.render(
    <IndexPage />,
    document.getElementById("app")
);
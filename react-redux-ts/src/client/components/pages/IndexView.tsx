import * as React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './IndexView.styles';

interface IndexViewProps {
    isUserAuthorized: boolean;
}

const IndexView: React.StatelessComponent<IndexViewProps> = (props) => {
    const { isUserAuthorized } = props;
    const activeLinkClass = 'btn';
    const disabledLinkClass = `${activeLinkClass} disabled`;
    const disabledLinkAuthorizedUser = () => (
        isUserAuthorized ? disabledLinkClass : activeLinkClass
    );
    const disabledLinkUnauthorizedUser = () => (
        isUserAuthorized ? activeLinkClass : disabledLinkClass
    );

    return (
        <div className="col-lg-4 col-lg-offset-4">
            <h3>Страницы приложения</h3>
            <ul className="nav navbar">
                <li>
                    <Link
                        style={ styles.indexView__link }
                        className={ disabledLinkAuthorizedUser() }
                        to="register">
                            Форма регистрации пользователя.
                    </Link>
                </li>
                <li>
                    <Link
                        style={ styles.indexView__link }
                        className={ disabledLinkAuthorizedUser() }
                        to="login">
                            Форма логина пользователя.
                    </Link>
                </li>
                <li>
                    <Link
                        style={ styles.indexView__link }
                        className={ disabledLinkUnauthorizedUser() }
                        to="photos">
                            Фотографии.
                    </Link>
                </li>
                <li>
                    <Link
                        style={ styles.indexView__link }
                        className={ disabledLinkUnauthorizedUser() }
                        to="profile">
                            Профиль пользователя.
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default IndexView;
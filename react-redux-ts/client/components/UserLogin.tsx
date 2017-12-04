import * as React from 'react';
import { Link } from 'react-router-dom';

export interface UserLoginProps {
    username: string;
}

const UserLogin: React.StatelessComponent<UserLoginProps> = props => {
    const { username } = props;

    return (
        <form className="user-area" method="POST" action="logout">
            <Link className="user-area__link" to="/profile">
                { username }
            </Link>
            <input className="btn bth-success" type="submit" defaultValue="Выйти" />
        </form>
    );
};

export default UserLogin;
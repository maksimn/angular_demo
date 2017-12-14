import * as React from 'react';
import { Link } from 'react-router-dom';

export interface UserLoginProps {
    username: string;
    onFormSubmit: () => void;
}

const UserLogin: React.StatelessComponent<UserLoginProps> = props => {
    const { username } = props;
    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onFormSubmit();
    };

    return (
        <form className="user-area" method="POST" action="logout" onSubmit={ onFormSubmit }>
            <Link className="user-area__link" to="/profile">
                { username }
            </Link>
            <input className="btn bth-success" type="submit" defaultValue="Выйти" />
        </form>
    );
};

export default UserLogin;
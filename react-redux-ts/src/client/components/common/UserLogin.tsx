import * as React from 'react';
import { Link } from 'react-router-dom';
import { userArea, userArea__link } from './UserLogin.styles';

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
        <form style={ userArea } onSubmit={ onFormSubmit }>
            <Link style={ userArea__link } to="/profile">
                { username }
            </Link>
            <input className="btn bth-success" type="submit" defaultValue="Выйти" />
        </form>
    );
};

export default UserLogin;
import * as React from 'react';
import UserLogin from '../containers/UserLogin';

const Header = (props: any) => {
    const redirect = props.history.push;

    return (
        <div className="container-fluid bg-primary">

            <UserLogin redirect={ redirect } />

            <h2 className="text-white">React TypeScript Демо</h2>

        </div>
    );
};

export default Header;
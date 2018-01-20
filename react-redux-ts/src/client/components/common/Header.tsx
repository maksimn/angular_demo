import * as React from 'react';
import UserLogin from '../../containers/common/UserLogin';
import { Link } from 'react-router-dom';

const Header = (props: any) => {
    const redirect = props.history.push;

    return (
        <div className="container-fluid bg-primary">

            <UserLogin redirect={ redirect } />

            <Link className="btn btn-primary" to="/">
                <h3 className="text-white">React TypeScript Демо</h3>
            </Link>

        </div>
    );
};

export default Header;
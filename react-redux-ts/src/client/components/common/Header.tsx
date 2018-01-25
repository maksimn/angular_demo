import * as React from 'react';
import { Link, StaticRouter } from 'react-router-dom';

interface HeaderProps {
    location: string;
    context: any;
}

const Header = (props: HeaderProps) => {
    return (
        <StaticRouter
                location={ props.location }
                context={ props.context }>

            <div className="container-fluid bg-primary">

                {/*<UserLogin />*/}

                <Link className="btn btn-primary" to="/">
                    <h3 className="text-white">React TypeScript Демо</h3>
                </Link>

            </div>
        </StaticRouter>
    );
};

export default Header;
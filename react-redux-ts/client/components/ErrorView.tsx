import * as React from 'react';
import { Link } from 'react-router-dom';

const ErrorView = () : JSX.Element => 
    <div className="col-lg-3 col-lg-offset-4">
        <h3 className="text-danger">Упс! Ошибка.</h3>
        <hr />
        <Link className="btn btn-default" to="/">На главную страницу</Link>
    </div>;

export default ErrorView;
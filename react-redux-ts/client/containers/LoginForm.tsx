/// <reference types="react" />
import * as React from 'react';
import LoginFormComponent from '../components/LoginForm';

class LoginForm extends React.Component<any, any> {
    constructor(props: any){
        super(props);
    }

    public render() {
        return <LoginFormComponent/>;
    }
}

export default LoginForm;
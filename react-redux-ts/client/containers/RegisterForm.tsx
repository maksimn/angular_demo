/// <reference types="react" />
import * as React from 'react';
import RegisterFormComponent from '../components/RegisterForm';

class RegisterForm extends React.Component<any, any> {
    constructor(props: any){
        super(props);
    }

    public render() {
        return <RegisterFormComponent/>;
    }
}

export default RegisterForm;
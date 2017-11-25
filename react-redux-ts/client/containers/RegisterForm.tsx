/// <reference types="react" />
/// <reference types="react-redux" />
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {submitRegistrationData} from "../actions/authorization";
import RegistrationData from '../interfaces/RegistrationData';
import RegisterFormComponent from '../components/RegisterForm';

class RegisterForm extends React.Component<any, RegistrationData> {
    constructor(props: any){
        super(props);
    }

    componentWillMount() {
        this.setState({
            username: '',
            password: '',
            confirmPassword: ' '
        });
    }

    onUsernameChange = (username: string) => {
        this.setState({...this.state, username});
    }

    onPasswordChange = (password: string) => {
        this.setState({...this.state, password});
    }

    onConfirmPasswordChange =  (confirmPassword: string) => {
        this.setState({...this.state, confirmPassword});
    }
    
    onFormSubmit = () => {
        this.props.dispatch(submitRegistrationData(this.state));
    }

    render() {
        const { onUsernameChange, onPasswordChange, onConfirmPasswordChange, onFormSubmit } = this;
        const { validationErrors } = this.props;
        const props = { onUsernameChange, onPasswordChange, onConfirmPasswordChange, onFormSubmit, 
            validationErrors };

        return <RegisterFormComponent {...props}  />;
    }
}

export default connect((state: any) => ({ validationErrors: state.validation }))(RegisterForm);
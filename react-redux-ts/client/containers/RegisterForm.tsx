/// <reference types="react" />
/// <reference types="react-redux" />
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../store/AppState';
import {submitRegistrationData} from "../actions/authorization";
import UserRegistrationInput from '../../app/models/UserRegistrationInput';
import RegisterFormComponent from '../components/RegisterForm';

class RegisterForm extends React.Component<any, UserRegistrationInput> {
    constructor(props: any){
        super(props);

        this.redirectToLoginOnSuccess = this.redirectToLoginOnSuccess.bind(this);
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
        this.props.dispatch(submitRegistrationData(this.state, this.redirectToLoginOnSuccess));
    }

    redirectToLoginOnSuccess() {
        this.props.history.push('/login');
    }

    render() {
        const { onUsernameChange, onPasswordChange, onConfirmPasswordChange, onFormSubmit } = this;
        const { validationErrors } = this.props;
        const props = { onUsernameChange, onPasswordChange, onConfirmPasswordChange, onFormSubmit, 
            validationErrors };

        return <RegisterFormComponent {...props}  />;
    }
}

export default connect(
    (state: AppState) => ({ validationErrors: state.validationErrors })
)(RegisterForm);
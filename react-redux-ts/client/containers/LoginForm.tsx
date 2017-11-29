/// <reference types="react" />
/// <reference types="react-redux" />
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store/AppState';
import { login } from "../actions/authorization";
import UserDataInput from '../../app/models/UserDataInput';
import LoginFormComponent from '../components/LoginForm';
import ValidationFieldError from '../../app/validate/ValidationFieldError';

export interface LoginFormProps {
    validationErrors: ValidationFieldError[];
    login: () => void;
}

export interface LoginFormState extends UserDataInput {
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.setState({
            username: '',
            password: ''
        });
    }

    onUsernameChange = (username: string) => {
        this.setState({...this.state, username});
    }

    onPasswordChange = (password: string) => {
        this.setState({...this.state, password});
    }

    onFormSubmit = () => {
        this.props.login();
    }

    render() {
        const { onUsernameChange, onPasswordChange, onFormSubmit } = this;
        const { validationErrors } = this.props;

        return <LoginFormComponent 
                   onUsernameChange={ onUsernameChange }
                   onPasswordChange={ onPasswordChange }
                   onFormSubmit={ onFormSubmit }
                   validationErrors={ validationErrors } />;
    }
}

export default connect(
    (state: AppState) => ({ validationErrors: state.validationErrors }),
    (dispatch) => ({
        login: () => { dispatch(login()); }
    })
)(LoginForm);
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/AppState';
import { authActionCreators } from '../../actions/authorization';
import UserDataInput from '../../../app/models/UserDataInput';
import LoginFormComponent from '../../components/auth/LoginForm';
import ValidationErrorsModel from '../../../app/models/ValidationErrors';

export interface LoginFormProps {
    validationErrors: ValidationErrorsModel;
    login: (loginData: UserDataInput) => void;
}

export interface LoginFormState extends UserDataInput {}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            username: '',
            password: ''
        });
    }

    onChange = (name: string, value: string) => {
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    onFormSubmit = () => {
        this.props.login(this.state);
    }

    render() {
        const { onChange, onFormSubmit } = this;
        const { validationErrors } = this.props;

        return <LoginFormComponent
                   onChange={ onChange }
                   onFormSubmit={ onFormSubmit }
                   validationErrors={ validationErrors } />;
    }
}

export default connect(
    (state: AppState) => ({ validationErrors: state.auth.validationErrors }),
    (dispatch) => ({
        login: (loginData: UserDataInput) => {
            dispatch(authActionCreators.loginStart(loginData));
        }
    })
)(LoginForm);
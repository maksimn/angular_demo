import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { History } from 'history';
import { AppState } from '../../store/AppState';
import { login } from '../../actions/authorization';
import UserDataInput from '../../../app/models/UserDataInput';
import LoginFormComponent from '../../components/auth/LoginForm';
import ValidationErrorsModel from '../../../app/models/ValidationErrors';

export interface LoginFormProps {
    validationErrors: ValidationErrorsModel;
    login: (loginData: UserDataInput, redirectCallback: () => void) => void;
    history: History;
}

export interface LoginFormState extends UserDataInput {
}

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

    onUsernameChange = (username: string) => {
        this.setState({...this.state, username});
    }

    onPasswordChange = (password: string) => {
        this.setState({...this.state, password});
    }

    onFormSubmit = () => {
        this.props.login(this.state, this.redirectToPhotosOnSuccess.bind(this));
    }

    redirectToPhotosOnSuccess() {
        this.props.history.push('/photos');
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
    (state: AppState) => ({ validationErrors: state.auth.validationErrors }),
    (dispatch: Dispatch<AppState>) => ({
        login: (loginData: UserDataInput, redirectCallback: () => void) => {
            dispatch(login(loginData, redirectCallback));
        }
    })
)(LoginForm);
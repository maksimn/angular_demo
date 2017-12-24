import * as React from 'react';
import { connect } from 'react-redux';
import { authActionCreators } from '../../actions/authorization';
import { AppState } from '../../store/AppState';
import UserRegistrationInput from '../../../app/models/UserRegistrationInput';
import RegisterFormComponent from '../../components/auth/RegisterForm';
import ValidationErrors from '../../../app/models/ValidationErrors';
import { Dispatch } from 'redux';

export interface State extends UserRegistrationInput {}

export interface Props {
    validationErrors: ValidationErrors;
    register: (registerData: UserRegistrationInput) => void;
}

class RegisterForm extends React.Component<Props, State> {
    constructor(props: Props) {
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
        this.props.register(this.state);
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
    (state: AppState) => ({ validationErrors: state.auth.validationErrors }),
    (dispatch: Dispatch<AppState>) => ({
        register: (registerData: UserRegistrationInput) => {
            dispatch(authActionCreators.registrationStart(registerData));
        }
    })
)(RegisterForm);
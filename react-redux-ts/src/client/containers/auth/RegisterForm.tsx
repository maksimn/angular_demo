import * as React from 'react';
import { connect } from 'react-redux';
import { authActionCreators } from '../../actions/authorization';
import { AppState } from '../../store/AppState';
import UserRegistrationInput from '../../../app/models/UserRegistrationInput';
import RegisterFormComponent from '../../components/auth/RegisterForm';

class RegisterForm extends React.Component<any, UserRegistrationInput> {
    constructor(props: any) {
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
        this.props.dispatch(authActionCreators.registrationStart(this.state));
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
    (state: AppState) => ({ validationErrors: state.auth.validationErrors })
)(RegisterForm);
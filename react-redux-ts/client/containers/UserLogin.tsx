import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../actions/authorization';
import { AppState } from '../store/AppState';
import UserLoginComponent from '../components/UserLogin';
import UserView from '../../app/models/UserView';

interface UserLoginProps {
    user: UserView;
    logout: () => void;
}

class UserLogin extends React.Component<UserLoginProps, any> {
    constructor(props: UserLoginProps) {
        super(props);
    }

    onFormSubmit = () => {
        this.props.logout();
    }

    render() {
        const { onFormSubmit } = this;
        const { user } = this.props;

        if (!user) {
            return null;
        }

        const username = user.name;

        return <UserLoginComponent username={ username }
                                   onFormSubmit={ onFormSubmit } />;
    }
}

export default connect(
    (state: AppState) => ({ user: state.user }),
    (dispatch: Dispatch<AppState>) => ({
        logout: () => {
            dispatch(logout());
        }
    })
)(UserLogin);
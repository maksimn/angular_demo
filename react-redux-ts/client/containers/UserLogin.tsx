import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store/AppState';
import UserLoginComponent from '../components/UserLogin';
import UserView from '../../app/models/UserView';

interface UserLoginProps {
    user: UserView;
}

class UserLogin extends React.Component<UserLoginProps, any> {
    constructor(props: UserLoginProps) {
        super(props);
    }

    render() {
        const { user } = this.props;

        if (!user) {
            return null;
        }

        const username = user.name;

        return <UserLoginComponent username={ username } />;
    }
}

export default connect(
    (state: AppState) => ({ user: state.user })
)(UserLogin);
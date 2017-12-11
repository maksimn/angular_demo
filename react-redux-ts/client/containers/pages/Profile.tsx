import * as React from 'react';
import ProfileComponent from '../../components/pages/Profile';
import UserView from '../../../app/models/UserView';
import { connect } from 'react-redux';
import { AppState } from '../../store/AppState';

export interface ProfileProps {
    user: UserView;
}

type ProfileState = {};

class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);
    }

    render() {
        const { user } = this.props;

        return <ProfileComponent user={ user }/>;
    }
}

export default connect(
    (state: AppState) => ({ user: state.auth.user })
)(Profile);
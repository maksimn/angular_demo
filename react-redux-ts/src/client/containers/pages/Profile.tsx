import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProfileComponent from '../../components/pages/Profile';
import UserView from '../../../app/models/UserView';
import { AppState } from '../../store/AppState';

export interface ProfileProps {
    isUserAuthorized: boolean;
    user: UserView;
}

type ProfileState = {};

class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);
    }

    render() {
        if (!this.props.isUserAuthorized) {
            return <Redirect to="/login" />;
        }

        const { user } = this.props;

        return <ProfileComponent user={ user } isUserAuthorized={true} />;
    }
}

export default connect(
    (state: AppState) => ({
        isUserAuthorized: state.auth.user !== null,
        user: state.auth.user
    })
)(Profile);
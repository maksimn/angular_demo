import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../store/AppState';

class Security extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { user, isAuthRequestPending } = this.props,
           url = this.props.location.pathname,
           isAuthenticated = user !== null;

        if (!isAuthRequestPending) {
            if (isAuthenticated && (url === '/login' || url === '/register')) {
                return <Redirect to="/photos" />;
            } else if (!isAuthenticated && (url.startsWith('/photos') || url === '/profile')) {
                return <Redirect to="/login" />;
            }
        }

        return null;
    }
}

export default connect(
    (state: AppState) => ({
        user: state.auth.user,
        isAuthRequestPending: state.auth.isAuthRequestPending
    })
)(Security);
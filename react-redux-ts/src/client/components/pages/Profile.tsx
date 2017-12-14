import * as React from 'react';
import { ProfileProps } from '../../containers/pages/Profile';

const Profile: React.StatelessComponent<ProfileProps> = props => {
    const { user } = props,
        username = user ? user.name : '',
        userId = user ? user.id : '';

    return (<div className="col-lg-offset-1">
        <h3>{ username } </h3>
        <div>ID: { userId }</div>
    </div>);
};

export default Profile;
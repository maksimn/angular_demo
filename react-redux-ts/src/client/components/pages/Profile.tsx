import * as React from 'react';
import { Link } from 'react-router-dom';
import { ProfileProps } from '../../containers/pages/Profile';

const Profile: React.StatelessComponent<ProfileProps> = props => {
    const { user } = props,
        username = user ? user.name : '',
        userId = user ? user.id : '';

    return (
        <div className="col-lg-offset-1">
            <h3>{ username } </h3>
            <div>ID: { userId }</div>

            <Link to="/photos/favorites">Избранные фотографии.</Link>
        </div>
    );
};

export default Profile;
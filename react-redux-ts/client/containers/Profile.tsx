/// <reference types="react" />
import * as React from 'react';
import ProfileComponent from '../components/Profile';

class Profile extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return <ProfileComponent/>;
    }
}

export default Profile;
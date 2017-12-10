import * as React from 'react';
import PhotosComponent from '../../components/photos/Photos';

class Photos extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return <PhotosComponent />;
    }
}

export default Photos;
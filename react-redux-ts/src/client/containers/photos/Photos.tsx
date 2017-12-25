import * as React from 'react';
import { connect } from 'react-redux';
import PhotosComponent from '../../components/photos/Photos';
import { photoActionCreators } from '../../actions/photos';

interface Props {
    loadPhotos: () => void;
}

interface State {}

class Photos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadPhotos();
    }

    public render() {
        return <PhotosComponent />;
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        loadPhotos: () => {
            dispatch(photoActionCreators.loadPhotos());
        }
    })
)(Photos);
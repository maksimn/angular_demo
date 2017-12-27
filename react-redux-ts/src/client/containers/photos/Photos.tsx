import * as React from 'react';
import { connect } from 'react-redux';
import PhotosComponent from '../../components/photos/Photos';
import { photoActionCreators } from '../../actions/photos';
import Photo from '../../store/Photo';
import { AppState } from '../../store/AppState';

interface Props {
    loadPhotos: () => void;
    photoData: Photo[];
}

interface State {}

class Photos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadPhotos();
    }

    static maxPhotosPerPage = 50;

    public render() {
        const photosToRender = this.props.photoData.slice(0, Photos.maxPhotosPerPage);

        return <PhotosComponent photoData={ photosToRender } />;
    }
}

export default connect(
    (state: AppState) => ({ photoData: state.photos.data }),
    (dispatch) => ({
        loadPhotos: () => {
            dispatch(photoActionCreators.loadPhotos());
        }
    })
)(Photos);
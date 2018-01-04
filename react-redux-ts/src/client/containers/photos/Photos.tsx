import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import PhotosComponent from '../../components/photos/Photos';
import { photoActionCreators } from '../../actions/photos';
import Photo from '../../store/Photo';
import { AppState } from '../../store/AppState';
import PhotosPagination from '../../components/photos/PhotosPagination';

interface PhotosRouteParams {
    page: string;
}

interface Props {
    loadPhotos: () => void;
    photoData: Photo[];
    match: match<PhotosRouteParams>;
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
        const { params } = this.props.match;

        const page = params.page ? parseInt(params.page) : 1;

        const photosToRender = this.props.photoData.slice(Photos.maxPhotosPerPage * (page - 1),
            Photos.maxPhotosPerPage * page);

        return (
            <div>
                <PhotosComponent photoData={ photosToRender } />

                <PhotosPagination
                    numPhotos={ this.props.photoData.length }
                    page={ page }
                    maxPhotosPerPage={ Photos.maxPhotosPerPage } />
            </div>
        );
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
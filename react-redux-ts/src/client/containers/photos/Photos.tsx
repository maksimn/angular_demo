import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import PhotosComponent from '../../components/photos/Photos';
import { photoActionCreators } from '../../actions/photos';
import Photo from '../../store/Photo';
import { AppState } from '../../store/AppState';
import PhotosPagination from '../../components/photos/PhotosPagination';
import PhotoBigSize from '../../components/photos/PhotoBigSize';

interface PhotosRouteParams {
    page?: string;
    photoId?: string;
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
        const { photoData } = this.props;
        const { params } = this.props.match;

        const page = params.page ? parseInt(params.page) : 1;

        const photosToRender = photoData.slice(Photos.maxPhotosPerPage * (page - 1),
            Photos.maxPhotosPerPage * page);

        const photoId = params.photoId ? params.photoId : '';
        const photo = photoId ? photoData[parseInt(photoId) - 1] : undefined;

        return (
            <div>
                <PhotosComponent
                    page={ page }
                    photoData={ photosToRender } />

                <PhotosPagination
                    numPhotos={ this.props.photoData.length }
                    page={ page }
                    maxPhotosPerPage={ Photos.maxPhotosPerPage } />

                <PhotoBigSize photo={ photo }/>
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
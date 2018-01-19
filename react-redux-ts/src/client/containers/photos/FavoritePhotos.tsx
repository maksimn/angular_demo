import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, PhotosState, PhotosRenderMode } from '../../store/AppState';
import PhotoThumbnails from '../../components/photos/PhotoThumbnails';
import { photoActionCreators } from '../../actions/photos';

interface Props {
    loadPhotos: () => void;
    setFavoritePhotosRenderMode: () => void;
    photosState: PhotosState;
}

interface State {}

class FavoritePhotos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        const { photosState, loadPhotos, setFavoritePhotosRenderMode } = this.props;

        setFavoritePhotosRenderMode();

        if (!photosState.isDataLoading && !photosState.isDataLoaded) {
            loadPhotos();
        }
    }

    render() {
        const favoritePhotos = this.props.photosState.favoriteData;

        return (
            <div>
                <h3>Избранные фотографии</h3>

                <PhotoThumbnails photoData={ favoritePhotos } />
            </div>
        );
    }
}

export default connect(
    (state: AppState) => ({
        photosState: state.photos
    }),
    (dispatch) => ({
        loadPhotos: () => {
            dispatch(photoActionCreators.loadPhotos());
        },
        setFavoritePhotosRenderMode: () => {
            dispatch(photoActionCreators.setPhotosRenderMode(PhotosRenderMode.favorite));
        }
    })
)(FavoritePhotos);
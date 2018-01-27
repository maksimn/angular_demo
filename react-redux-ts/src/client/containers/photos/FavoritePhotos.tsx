import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { match } from 'react-router';
import { Redirect } from 'react-router-dom';

import { AppState, PhotosState, PhotosRenderMode } from '../../store/AppState';
import PhotoThumbnails from '../../components/photos/PhotoThumbnails';
import { photoActionCreators } from '../../actions/photos';
import PhotoDataManager from '../../utils/PhotoDataManager';
import PhotoBigSize from '../../components/photos/PhotoBigSize';
import Photo from '../../store/Photo';

interface FavoritePhotosRouteParams {
    photoId?: string;
}

interface Props {
    loadPhotos: () => void;
    setFavoritePhotosRenderMode: () => void;
    removeFromFavorites: (photo: Photo) => void;
    backToPhotosPage: (path: string) => void;
    isUserAuthorized: boolean;
    photosState: PhotosState;
    match: match<FavoritePhotosRouteParams>;
}

interface State {}

class FavoritePhotos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onOuterAreaClick = this.onOuterAreaClick.bind(this);
        this.removeFromFavoritesClick = this.removeFromFavoritesClick.bind(this);
    }

    componentDidMount() {
        const { photosState, loadPhotos, setFavoritePhotosRenderMode } = this.props;

        setFavoritePhotosRenderMode();

        if (!photosState.isDataLoading && !photosState.isDataLoaded) {
            loadPhotos();
        }
    }

    onOuterAreaClick() {
        this.props.backToPhotosPage('/photos/favorites');
    }

    removeFromFavoritesClick(photo: Photo) {
        this.props.removeFromFavorites(photo);
    }

    render() {
        if (!this.props.isUserAuthorized) {
            return <Redirect to="/login" />;
        }

        const { photosState } = this.props;
        const photoDataManager = new PhotoDataManager(photosState);
        const favoritePhotos = photoDataManager.getPhotosToRenderOnPage();

        const { params } = this.props.match;
        const photoId = parseInt(params.photoId ? params.photoId : '');
        const photo = photoDataManager.getPhoto(photoId);
        const prevPhoto = photoDataManager.getPrevPhoto();
        const nextPhoto = photoDataManager.getNextPhoto();

        return (
            <div>
                <h3>Избранные фотографии</h3>

                <PhotoThumbnails photoData={ favoritePhotos } />

                <PhotoBigSize
                    photo={ photo }
                    prevPhoto={ prevPhoto }
                    nextPhoto={ nextPhoto }
                    isFavorite={ true }
                    onOuterAreaClick={ this.onOuterAreaClick }
                    addToFavoritesButtonClick={ this.removeFromFavoritesClick } />
            </div>
        );
    }
}

export default connect(
    (state: AppState) => ({
        isUserAuthorized: state.auth.user !== null,
        photosState: state.photos
    }),
    (dispatch) => ({
        loadPhotos: () => {
            dispatch(photoActionCreators.loadPhotos());
        },
        backToPhotosPage: (url: string) => {
            dispatch(push(url));
        },
        setFavoritePhotosRenderMode: () => {
            dispatch(photoActionCreators.setPhotosRenderMode(PhotosRenderMode.favorite));
        },
        removeFromFavorites: (photo: Photo) => {
            dispatch(photoActionCreators.removePhotoFromFavorites(photo));
        }
    })
)(FavoritePhotos);
import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { push } from 'react-router-redux';

import PhotoThumbnails from '../../components/photos/PhotoThumbnails';
import { photoActionCreators } from '../../actions/photos';
import { AppState, PhotosState, PhotosRenderMode } from '../../store/AppState';
import PhotosPagination from '../../components/photos/PhotosPagination';
import PhotoBigSize from '../../components/photos/PhotoBigSize';
import PhotoDataManager from '../../utils/PhotoDataManager';
import SearchBlock from '../../components/photos/SearchBlock';
import Photo from '../../store/Photo';
import photoBinarySearch from '../../utils/photoBinarySearch';

interface PhotosRouteParams {
    page?: string;
    photoId?: string;
    searchParam?: string;
}

interface Props {
    loadPhotos: () => void;
    backToPhotosPage: (url: string) => void;
    addToFavorites: (photo: Photo) => void;
    removeFromFavorites: (photo: Photo) => void;
    setRenderMode: (renderMode: PhotosRenderMode) => void;
    setPhotosSearchParam: (searchParam: string) => void;
    updatePhotosState: () => void;
    isUserAuthorized: boolean;
    photos: PhotosState;
    match: match<PhotosRouteParams>;
    searchParam: string;
}

interface State {}

class Photos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onOuterAreaClick = this.onOuterAreaClick.bind(this);
        this.addToFavoritesButtonClick = this.addToFavoritesButtonClick.bind(this);
        this.onSearchParamChange = this.onSearchParamChange.bind(this);
    }

    componentDidMount() {
        const { isDataLoaded, isDataLoading } = this.props.photos;

        this.props.setRenderMode(PhotosRenderMode.all);

        if (!isDataLoaded && !isDataLoading) {
            this.props.loadPhotos();
        }

        const { searchParam } = this.props.match.params;

        if (searchParam) {
            this.props.setPhotosSearchParam(searchParam);
        }
    }

    onOuterAreaClick() {
        interface RedirectUrl {
            (page: number, searchParam?: string): string;
        }

        const redirectUrlAllPhotosMode: RedirectUrl = (page: number, searchParam?: string) => {
            return `/photos/${page}`;
        };

        const redirectUrlFilteredPhotosMode: RedirectUrl = (page: number, searchParam?: string) => {
            return `/photos/searching/${photosState.searchParam}/${page}`;
        };

        const RedirectUrlFactory = (renderMode: PhotosRenderMode): RedirectUrl => {
            if (renderMode === PhotosRenderMode.all) {
                return redirectUrlAllPhotosMode;
            } else if (renderMode === PhotosRenderMode.filtered) {
                return redirectUrlFilteredPhotosMode;
            } else {
                return redirectUrlAllPhotosMode;
            }
        };

        const photosState = this.props.photos;
        const page = this.getCurrentPage();
        const { searchParam } = photosState;

        const redirectUrl = RedirectUrlFactory(photosState.photosRenderMode);

        this.props.backToPhotosPage(redirectUrl(page, searchParam));
    }

    getCurrentPage(): number {
        const { params } = this.props.match;
        const page = params.page ? parseInt(params.page) : 1;

        return page;
    }

    addToFavoritesButtonClick(photo: Photo, isFavorite?: boolean) {
        if (isFavorite) {
            this.props.removeFromFavorites(photo);
        } else {
            this.props.addToFavorites(photo);
        }
    }

    onSearchParamChange(searchParam: string) {
        const { setPhotosSearchParam, updatePhotosState, backToPhotosPage } = this.props;

        setPhotosSearchParam(searchParam);
        updatePhotosState();

        if (searchParam) {
            backToPhotosPage(`/photos/searching/${searchParam}`);
        } else {
            backToPhotosPage('/photos');
        }
    }

    public render() {
        if (!this.props.isUserAuthorized) {
            return <Redirect to="/login" />;
        }

        const photosState = this.props.photos;
        const { searchParam } = photosState;
        const renderMode = photosState.photosRenderMode;
        const photoDataManager = new PhotoDataManager(photosState);

        const page = this.getCurrentPage();
        const numPages = photoDataManager.numPages;
        const photosToRender = photoDataManager.getPhotosToRenderOnPage(page);

        const { params } = this.props.match;
        const photoId = parseInt(params.photoId ? params.photoId : '');
        const photo = photoDataManager.getPhoto(photoId);
        const isFavorite = photoBinarySearch(photoId, photosState.favoriteData, 0,
            photosState.favoriteData.length - 1) > -1;
        const prevPhoto = photoDataManager.getPrevPhoto();
        const nextPhoto = photoDataManager.getNextPhoto();

        return (
            <div>
                <SearchBlock
                    searchParam={ searchParam }
                    onSearchParamChange={ this.onSearchParamChange } />

                <PhotoThumbnails photoData={ photosToRender } />

                <PhotosPagination
                    numPages={ numPages }
                    page={ page }
                    renderMode={ renderMode }
                    searchParam={ searchParam } />

                <PhotoBigSize
                    photo={ photo }
                    prevPhoto={ prevPhoto }
                    nextPhoto={ nextPhoto }
                    isFavorite={ isFavorite }
                    onOuterAreaClick={ this.onOuterAreaClick }
                    addToFavoritesButtonClick={ this.addToFavoritesButtonClick } />
            </div>
        );
    }
}

export default connect(
    (state: AppState) => ({
        isUserAuthorized: state.auth.user !== null,
        photos: state.photos,
        searchParam: state.photos.searchParam
    }),
    (dispatch) => ({
        loadPhotos: () => {
            dispatch(photoActionCreators.loadPhotos());
        },
        backToPhotosPage: (url: string) => {
            dispatch(push(url));
        },
        addToFavorites: (photo: Photo) => {
            dispatch(photoActionCreators.addPhotoToFavorites(photo));
        },
        removeFromFavorites: (photo: Photo) => {
            dispatch(photoActionCreators.removePhotoFromFavorites(photo));
        },
        setRenderMode: (renderMode: PhotosRenderMode) => {
            dispatch(photoActionCreators.setPhotosRenderMode(renderMode));
        },
        setPhotosSearchParam: (searchParam: string) => {
            dispatch(photoActionCreators.setPhotosSearchParam(searchParam));
        },
        updatePhotosState: () => {
            dispatch(photoActionCreators.updatePhotosState());
        }
    })
)(Photos);
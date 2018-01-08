import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PhotosComponent from '../../components/photos/Photos';
import { photoActionCreators } from '../../actions/photos';
import Photo from '../../store/Photo';
import { AppState, PhotosState, PhotosRenderMode } from '../../store/AppState';
import PhotosPagination from '../../components/photos/PhotosPagination';
import PhotoBigSize from '../../components/photos/PhotoBigSize';
import PhotoDataManager from '../../utils/PhotoDataManager';
import PhotoDataFactory from '../../utils/PhotoDataFactory';
import SearchBlock from '../../containers/photos/SearchBlock';

interface PhotosRouteParams {
    page?: string;
    photoId?: string;
    searchParam?: string;
}

interface Props {
    loadPhotos: () => void;
    backToPhotosPage: (page: number) => void;
    photos: PhotosState;
    match: match<PhotosRouteParams>;
    history: any;
}

interface State {}

class Photos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onOuterAreaClick = this.onOuterAreaClick.bind(this);
    }

    componentWillMount() {
        this.props.loadPhotos();
    }

    onOuterAreaClick() {
        this.props.backToPhotosPage(this.getCurrentPage());
    }

    getCurrentPage(): number {
        const { params } = this.props.match;
        const page = params.page ? parseInt(params.page) : 1;

        return page;
    }

    public render() {
        const renderMode = this.props.photos.photosRenderMode;
        const photoData = PhotoDataFactory(this.props.photos);
        const photoDataManager = new PhotoDataManager(photoData);
        const { params } = this.props.match;
        const page = this.getCurrentPage();
        const numPages = photoDataManager.numPages;
        const photosToRender = photoDataManager.getPhotosToRenderOnPage(page);
        const photoId = parseInt(params.photoId ? params.photoId : '');

        const photo = photoDataManager.getPhoto(photoId);
        const prevPhoto = photoDataManager.getPrevPhoto(photoId);
        const nextPhoto = photoDataManager.getNextPhoto(photoId);

        return (
            <div>
                <SearchBlock history={ this.props.history } />

                <PhotosComponent
                    page={ page }
                    photoData={ photosToRender } />

                <PhotosPagination
                    numPages={ numPages }
                    page={ page }/>

                <PhotoBigSize
                    photo={ photo }
                    prevPhoto={ prevPhoto }
                    nextPhoto={ nextPhoto }
                    onOuterAreaClick={ this.onOuterAreaClick }
                />
            </div>
        );
    }
}

export default connect(
    (state: AppState) => ({ photos: state.photos }),
    (dispatch) => ({
        loadPhotos: () => {
            dispatch(photoActionCreators.loadPhotos());
        },
        backToPhotosPage: (page: number) => {
            dispatch(push(`/photos/${page}`));
        }
    })
)(Photos);
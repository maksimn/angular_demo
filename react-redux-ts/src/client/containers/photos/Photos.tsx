import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PhotosComponent from '../../components/photos/Photos';
import { photoActionCreators } from '../../actions/photos';
import Photo from '../../store/Photo';
import { AppState } from '../../store/AppState';
import PhotosPagination from '../../components/photos/PhotosPagination';
import PhotoBigSize from '../../components/photos/PhotoBigSize';
import { MAX_PHOTOS_ON_PAGE } from '../../constants';

interface PhotosRouteParams {
    page?: string;
    photoId?: string;
}

interface Props {
    loadPhotos: () => void;
    backToPhotosPage: (page: number) => void;
    photoData: Photo[];
    match: match<PhotosRouteParams>;
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
        const { photoData } = this.props;
        const { params } = this.props.match;
        const page = this.getCurrentPage();
        const numPages = Math.ceil(photoData.length / MAX_PHOTOS_ON_PAGE);
        const photosToRender = photoData.slice(MAX_PHOTOS_ON_PAGE * (page - 1), MAX_PHOTOS_ON_PAGE * page);

        let photo: Photo | undefined;
        let prevPhotoUrl = '';
        let nextPhotoUrl = '';

        if (params.photoId) {
            const photoIndex = parseInt(params.photoId) - 1;
            const lastPhotoIndex = photoData.length - 1;
            const prevPhotoIndex = photoIndex > 0 ? photoIndex - 1 : lastPhotoIndex;
            const nextPhotoIndex = photoIndex < lastPhotoIndex ? photoIndex + 1 : 0;
            const prevPhoto = photoData[prevPhotoIndex];
            const nextPhoto = photoData[nextPhotoIndex];

            photo = photoData[photoIndex];
            prevPhotoUrl = `/photos/${prevPhoto.page}/photoId/${prevPhoto.id}`;
            nextPhotoUrl = `/photos/${nextPhoto.page}/photoId/${nextPhoto.id}`;
        }

        return (
            <div>
                <PhotosComponent
                    page={ page }
                    photoData={ photosToRender } />

                <PhotosPagination
                    numPages={ numPages }
                    page={ page }/>

                <PhotoBigSize
                    photo={ photo }
                    prevPhotoUrl={ prevPhotoUrl }
                    nextPhotoUrl={ nextPhotoUrl }
                    onOuterAreaClick={ this.onOuterAreaClick }
                />
            </div>
        );
    }
}

export default connect(
    (state: AppState) => ({ photoData: state.photos.data }),
    (dispatch) => ({
        loadPhotos: () => {
            dispatch(photoActionCreators.loadPhotos());
        },
        backToPhotosPage: (page: number) => {
            dispatch(push(`/photos/${page}`));
        }
    })
)(Photos);
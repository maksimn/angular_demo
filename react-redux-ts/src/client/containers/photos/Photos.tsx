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

    static maxPhotosPerPage = 50;

    onOuterAreaClick() {
        this.props.backToPhotosPage(this.getCurrentPage());
    }

    getCurrentPage(): number {
        const { params } = this.props.match;
        const page = params.page ? parseInt(params.page) : 1;

        return page;
    }

    getNextPhotoUrl(photoId: string, page: number, maxPhotosPerPage: number, numPhotos: number): string {
        if (!photoId) return '';

        const photoIndex = parseInt(photoId) - 1;
        const pagesQty = Math.ceil(numPhotos / maxPhotosPerPage);
        const nextPage = page < pagesQty ? page + 1 : 1;
        const nextPhotoIndex = photoIndex === numPhotos - 1 ? 0 : photoIndex + 1;
        const nextPhotoUrlPage = photoIndex === page * maxPhotosPerPage - 1 ? nextPage : page;
        return `/photos/${ nextPhotoUrlPage }/photoId/${ nextPhotoIndex + 1 }`;
    }

    getPrevPhotoUrl(photoId: string, page: number, maxPhotosPerPage: number, numPhotos: number): string {
        if (!photoId) return '';

        const photoIndex = parseInt(photoId) - 1;
        const pagesQty = Math.ceil(numPhotos / maxPhotosPerPage);
        const prevPage = page > 1 ? page - 1 : pagesQty;
        const prevPhotoIndex = photoIndex === 0 ? numPhotos - 1 : photoIndex - 1;
        const prevPhotoUrlPage = photoIndex === (page - 1) * maxPhotosPerPage ? prevPage : page;
        return `/photos/${prevPhotoUrlPage}/photoId/${prevPhotoIndex + 1}`;
    }

    public render() {
        const { photoData } = this.props;
        const { params } = this.props.match;
        const { maxPhotosPerPage } = Photos;
        const page = this.getCurrentPage();
        const numPhotos = photoData.length;
        const photosToRender = photoData.slice(maxPhotosPerPage * (page - 1), maxPhotosPerPage * page);

        let photoId = '';
        let photo: Photo | undefined = undefined;

        if (params.photoId) {
            photoId = params.photoId;
            const photoIndex = parseInt(photoId) - 1;
            photo = photoData[photoIndex];
        }

        return (
            <div>
                <PhotosComponent
                    page={ page }
                    photoData={ photosToRender } />

                <PhotosPagination
                    numPhotos={ this.props.photoData.length }
                    page={ page }
                    maxPhotosPerPage={ Photos.maxPhotosPerPage } />

                <PhotoBigSize
                    photo={ photo }
                    prevPhotoUrl={ this.getPrevPhotoUrl(photoId, page, maxPhotosPerPage, numPhotos) }
                    nextPhotoUrl={ this.getNextPhotoUrl(photoId, page, maxPhotosPerPage, numPhotos) }
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
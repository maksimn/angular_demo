import * as React from 'react';
import { Link } from 'react-router-dom';
import { PhotosRenderMode } from '../../store/AppState';

interface Props {
    thumbnailUrl: string;
    title: string;
    page: number;
    photoId: number;
    renderMode: PhotosRenderMode;
    searchParam?: string;
}

interface GetThumbnailLinkHref {
    (page: number, photoId: number, searchParam?: string): string;
}

const getGetThumbnailLinkHrefAllPhotosMode: GetThumbnailLinkHref =
        (page: number, photoId: number, searchParam?: string) => {
    return `/photos/${page}/photoId/${photoId}`;
};

const getGetThumbnailLinkHrefFilteredMode: GetThumbnailLinkHref =
        (page: number, photoId: number, searchParam?: string) => {
    return `/photos/searching/${searchParam}/${page}/photoId/${photoId}`;
};

const getThumbnailLinkHrefFactory = (renderMode: PhotosRenderMode) => {
    if (renderMode === PhotosRenderMode.all) {
        return getGetThumbnailLinkHrefAllPhotosMode;
    } else if (renderMode === PhotosRenderMode.filtered) {
        return getGetThumbnailLinkHrefFilteredMode;
    }

    throw new Error('Not implemented render mode.');
};

const PhotoThumbnail: React.StatelessComponent<Props> = props => {
    const { photoId, page, renderMode, searchParam } = props;

    const getThumbnailLinkHref = getThumbnailLinkHrefFactory(renderMode);

    return <div className="photo-thumbnail-view">
        <Link to={ getThumbnailLinkHref(page, photoId, searchParam) }>
            <img src={ props.thumbnailUrl } />
        </Link>
        <div>{ props.title }</div>
    </div>;
};

export default PhotoThumbnail;
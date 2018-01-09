import * as React from 'react';
import { Link } from 'react-router-dom';
import { PhotosRenderMode } from '../../store/AppState';

interface Props {
    numPages: number;
    page: number;
    renderMode: PhotosRenderMode;
    searchParam?: string;
}

interface GetPaginationLinkHref {
    (page: number, searchParam?: string): string;
}

const GetPaginationLinkHrefForAllPhotosMode: GetPaginationLinkHref =
    (page: number, searchParam?: string) => {
    return `/photos/${page}`;
};

const GetPaginationLinkHrefForFilteredPhotos: GetPaginationLinkHref =
    (page: number, searchParam?: string) => {
    return `/photos/searching/${searchParam}/${page}`;
};

const PaginationLinkHrefProviderFactory = (renderMode: PhotosRenderMode): GetPaginationLinkHref => {
    if (renderMode === PhotosRenderMode.all) {
        return GetPaginationLinkHrefForAllPhotosMode;
    } else if (renderMode === PhotosRenderMode.filtered) {
        return GetPaginationLinkHrefForFilteredPhotos;
    }

    throw new Error('Not implemented photos render mode.');
};

const PhotosPagination: React.StatelessComponent<Props> = props => {
    const { page, numPages, renderMode, searchParam } = props;

    const getPaginationLinkHref = PaginationLinkHrefProviderFactory(renderMode);

    const links = Array.apply(null, Array(numPages)).map((e: any, i: number) => (
        <Link
            key={i}
            className={`pagination-link ${i + 1 === page ? 'active' : ''}`}
            to={ getPaginationLinkHref(i + 1, searchParam) }>
            {i + 1}
        </Link>
    ));

    return <div className="photos-pagination">
        {links}
    </div>;
};

export default PhotosPagination;
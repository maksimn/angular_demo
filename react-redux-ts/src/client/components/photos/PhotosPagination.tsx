import * as React from 'react';
import { Link } from 'react-router-dom';
import { PhotosRenderMode } from '../../store/AppState';
import * as styles from './PhotosPagination.styles';

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
    } else {
        return GetPaginationLinkHrefForAllPhotosMode;
    }
};

const PhotosPagination: React.StatelessComponent<Props> = props => {
    const { page, numPages, renderMode, searchParam } = props;

    const getPaginationLinkHref = PaginationLinkHrefProviderFactory(renderMode);

    const links = Array.apply(null, Array(numPages)).map((e: any, i: number) => {
        const isActive = i + 1 === page;
        const linkStyle = isActive ?
            {...styles.paginationLink, ...styles.paginationLink_active} :
            {...styles.paginationLink};

        return (
            <Link
                key={i}
                style={ linkStyle }
                to={ getPaginationLinkHref(i + 1, searchParam) }>
                {i + 1}
            </Link>
        );
    });

    return <div style={ styles.photosPagination }>
        {links}
    </div>;
};

export default PhotosPagination;
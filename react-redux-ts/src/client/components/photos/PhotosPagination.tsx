import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    page: number;
    maxPhotosPerPage: number;
    numPhotos: number;
}

const PhotosPagination: React.StatelessComponent<Props> = props => {
    const { page, maxPhotosPerPage, numPhotos } = props;
    const numPaginationLinks = Math.ceil(numPhotos / maxPhotosPerPage);

    const links = Array.apply(null, Array(numPaginationLinks)).map((e: any, i: number) => (
        <Link
            key={i}
            className={`pagination-link ${i + 1 === page ? 'active' : ''}`}
            to={`/photos/${i + 1}`}>
            {i + 1}
        </Link>
    ));

    return <div>
        {links}
    </div>;
};

export default PhotosPagination;
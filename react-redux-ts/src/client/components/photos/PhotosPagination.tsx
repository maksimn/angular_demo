import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    page: number;
    numPages: number;
}

const PhotosPagination: React.StatelessComponent<Props> = props => {
    const { page, numPages } = props;

    const links = Array.apply(null, Array(numPages)).map((e: any, i: number) => (
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
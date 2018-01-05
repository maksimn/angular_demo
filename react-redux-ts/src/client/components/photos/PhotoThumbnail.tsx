import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    thumbnailUrl: string;
    title: string;
    page: number;
    photoId: number;
}

const PhotoThumbnail: React.StatelessComponent<Props> = props => {
    const { photoId, page } = props;

    return <div className="photo-thumbnail-view">
        <Link to={`/photos/${page}/photoId/${photoId}`}>
            <img src={ props.thumbnailUrl } />
        </Link>
        <div>{ props.title }</div>
    </div>;
};

export default PhotoThumbnail;
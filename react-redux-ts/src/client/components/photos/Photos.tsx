import * as React from 'react';
import PhotoThumbnail from './PhotoThumbnail';
import Photo from '../../store/Photo';

interface Props {
    photoData: Photo[];
    page: number;
}

const Photos: React.StatelessComponent<Props> = props => {
    const { page } = props;

    const thumbnails = props.photoData.map((photo, i) => (
        <PhotoThumbnail key={ i }
                        thumbnailUrl={ photo.thumbnailUrl }
                        title={ photo.title }
                        page={ page }
                        photoId={ photo.id } />
    ));

    return <div>
        { thumbnails }
        <div className="placeholder-under-photo-thumbnails"></div>
    </div>;
};

export default Photos;
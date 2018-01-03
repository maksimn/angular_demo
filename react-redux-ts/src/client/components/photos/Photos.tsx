import * as React from 'react';
import PhotoThumbnail from './PhotoThumbnail';
import Photo from '../../store/Photo';

interface Props {
    photoData: Photo[];
}

const Photos: React.StatelessComponent<Props> = props => {
    if (props.photoData.length > 0) {
        const thumbnails = props.photoData.map((photo, i) => (
            <PhotoThumbnail key={ i }
                            thumbnailUrl={ photo.thumbnailUrl }
                            title={ photo.title } />
        ));

        return <div>
            { thumbnails }
        </div>;
    }

    return null;
};

export default Photos;
import * as React from 'react';
import PhotoThumbnail from './PhotoThumbnail';
import Photo from '../../store/Photo';
import { PhotosRenderMode } from '../../store/AppState';
import styles from './PhotoThumbnails.styles';

interface Props {
    photoData: Photo[];
}

const PhotoThumbnails: React.StatelessComponent<Props> = props => {
    const thumbnails = props.photoData.map((photo, i) => (
        <PhotoThumbnail key={ i }
                        thumbnailUrl={ photo.thumbnailUrl }
                        title={ photo.title }
                        appUrlToPhoto={ photo.appUrlToPhoto } />
    ));

    return <div style={ styles }>
        { thumbnails }
    </div>;
};

export default PhotoThumbnails;
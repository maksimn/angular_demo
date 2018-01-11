import * as React from 'react';
import PhotoThumbnail from './PhotoThumbnail';
import Photo from '../../store/Photo';
import { PhotosRenderMode } from '../../store/AppState';

interface Props {
    photoData: Photo[];
    page: number;
    renderMode: PhotosRenderMode;
    searchParam?: string;
}

const PhotoThumbnails: React.StatelessComponent<Props> = props => {
    const { page, renderMode, searchParam } = props;

    const thumbnails = props.photoData.map((photo, i) => (
        <PhotoThumbnail key={ i }
                        thumbnailUrl={ photo.thumbnailUrl }
                        title={ photo.title }
                        page={ page }
                        photoId={ photo.id }
                        renderMode={ renderMode }
                        searchParam={ searchParam } />
    ));

    return <div>
        { thumbnails }
        <div className="placeholder-under-photo-thumbnails"></div>
    </div>;
};

export default PhotoThumbnails;
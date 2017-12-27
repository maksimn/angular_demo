import * as React from 'react';
import PhotoThumbnail from './PhotoThumbnail';
import Photo from '../../store/Photo';

interface Props {
    photoData: Photo[];
}

const Photos: React.StatelessComponent<Props> = props => {
    if (props.photoData.length > 0) {
        const { thumbnailUrl, title } = props.photoData[0];

        return <div>
            <PhotoThumbnail
                thumbnailUrl={ thumbnailUrl }
                title={ title }/>
        </div>;
    }

    return null;
};

export default Photos;
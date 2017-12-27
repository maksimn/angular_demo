import * as React from 'react';

interface Props {
    thumbnailUrl: string;
    title: string;
}

const PhotoThumbnail: React.StatelessComponent<Props> = props => {
    return <div className="photo-thumbnail-view">
        <img src={ props.thumbnailUrl } />
        <div>{ props.title }</div>
    </div>;
};

export default PhotoThumbnail;
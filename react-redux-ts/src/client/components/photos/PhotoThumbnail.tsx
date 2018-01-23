import * as React from 'react';
import { Link } from 'react-router-dom';
import { PhotosRenderMode } from '../../store/AppState';
import styles from './PhotoThumbnail.styles';

interface Props {
    thumbnailUrl: string;
    title: string;
    appUrlToPhoto: string;
}

const PhotoThumbnail: React.StatelessComponent<Props> = props => {
    return (
        <div style={ styles }>
            <Link to={ props.appUrlToPhoto }>
                <img src={ props.thumbnailUrl } />
            </Link>
            <div>{ props.title }</div>
        </div>
    );
};

export default PhotoThumbnail;
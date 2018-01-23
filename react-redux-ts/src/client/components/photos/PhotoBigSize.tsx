import * as React from 'react';
import Photo from '../../store/Photo';
import { Link } from 'react-router-dom';
import * as styles from './PhotoBigSize.styles';

interface Props {
    photo?: Photo;
    nextPhoto?: Photo;
    prevPhoto?: Photo;
    isFavorite?: boolean;
    onOuterAreaClick: () => void;
    addToFavoritesButtonClick: (photo: Photo, isFavorite?: boolean) => void;
}

const PhotoBigSize: React.StatelessComponent<Props> = props => {
    const { photo, prevPhoto, nextPhoto, isFavorite } = props;

    if (!photo || !prevPhoto || !nextPhoto) {
       return null;
    }

    const { url, title } = photo;

    const onOuterAreaClick = () => {
        props.onOuterAreaClick();
    };

    const addToFavoritesButtonClick = () => {
        props.addToFavoritesButtonClick(photo, props.isFavorite);
    };

    return (
        <div>
            <div
                style={ styles.photoBigsize__shadow }
                onClick={ onOuterAreaClick }>
            </div>
            <div style={ styles.photoBigsize }>
                <img src={ url } />
                <div style={ styles.photoBigsize__controlsBlock }>
                    <Link
                        style={ styles.photoBigsize__prevPhotoLink }
                        className="btn btn-default"
                        to={ prevPhoto.appUrlToPhoto }>&lt;</Link>
                    <div style={ styles.photoBigsize__title }>
                        { title }
                    </div>
                    <button
                        type="button"
                        style={ styles.photoBigsize__addToFavorites }
                        className="btn btn-default"
                        onClick={ addToFavoritesButtonClick }>
                            { props.isFavorite ? <span>&times;</span> : <span>&#9734;</span> }
                    </button>
                    <Link
                        style={ styles.photoBigsize__nextPhotoLink }
                        className="btn btn-default"
                        to={ nextPhoto.appUrlToPhoto }>&gt;</Link>
                </div>
            </div>
        </div>
    );
};

export default PhotoBigSize;
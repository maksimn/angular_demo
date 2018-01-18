import * as React from 'react';
import Photo from '../../store/Photo';
import { Link } from 'react-router-dom';

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
                className="photo-bigsize__shadow"
                onClick={ onOuterAreaClick }>
            </div>
            <div className="photo-bigsize">
                <img src={ url } />
                <div className="photo-bigsize__controls-block">
                    <Link className="photo-bigsize__prev-photo-link btn btn-default"
                        to={ prevPhoto.appUrlToPhoto }>&lt;</Link>
                    <div className="photo-bigsize__title">
                        { title }
                    </div>
                    <button
                        type="button"
                        className="photo-bigsize__add-to-favorites btn btn-default"
                        onClick={ addToFavoritesButtonClick }>
                            { props.isFavorite ? <span>&times;</span> : <span>&#9734;</span> }
                    </button>
                    <Link className="photo-bigsize__next-photo-link btn btn-default"
                        to={ nextPhoto.appUrlToPhoto }>&gt;</Link>
                </div>
            </div>
        </div>
    );
};

export default PhotoBigSize;
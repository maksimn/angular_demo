import * as React from 'react';
import Photo from '../../store/Photo';
import { Link } from 'react-router-dom';

interface Props {
    photo?: Photo;
    nextPhoto?: Photo;
    prevPhoto?: Photo;
    onOuterAreaClick: () => void;
}

const PhotoBigSize: React.StatelessComponent<Props> = props => {
    const { photo, prevPhoto, nextPhoto } = props;

    if (!photo || !prevPhoto || !nextPhoto) {
       return null;
    }

    const { url, title } = photo;

    const onOuterAreaClick = () => {
        props.onOuterAreaClick();
    };

    return (
        <div>
            <div
                className="photo-bigsize__shadow"
                onClick={onOuterAreaClick}>
            </div>
            <div className="photo-bigsize">
                <img src={url} />
                <div className="photo-bigsize__controls-block">
                    <Link className="photo-bigsize__prev-photo-link btn btn-default"
                        to={ prevPhoto.appUrlToPhoto }>&lt;</Link>
                    <div className="photo-bigsize__title">
                        {title}
                    </div>
                    <button
                        type="button"
                        className="photo-bigsize__add-to-favorites btn btn-default">
                            &#9734;
                    </button>
                    <Link className="photo-bigsize__next-photo-link btn btn-default"
                        to={ nextPhoto.appUrlToPhoto }>&gt;</Link>
                </div>
            </div>
        </div>
    );
};

export default PhotoBigSize;
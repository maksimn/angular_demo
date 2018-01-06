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

    if (!photo) {
       return null;
    }

    const url = photo ? photo.url : '';
    const title = photo ? photo.title : '';

    const onOuterAreaClick = () => {
        props.onOuterAreaClick();
    };

    return <div>
        <div
            className="photo-bigsize__shadow"
            onClick={onOuterAreaClick}>
        </div>
        <div className="photo-bigsize">
            <img src={url} />
            <div className="photo-bigsize__title">
                <Link className="photo-bigsize__prev-photo-link btn btn-default"
                    to={ prevPhoto ? `/photos/${prevPhoto.page}/photoId/${prevPhoto.id}` : '' }>&lt;</Link>
                {title}
                <Link className="photo-bigsize__next-photo-link btn btn-default"
                    to={ nextPhoto ? `/photos/${nextPhoto.page}/photoId/${nextPhoto.id}` : '' }>&gt;</Link>
            </div>
        </div>
    </div>;
};

export default PhotoBigSize;
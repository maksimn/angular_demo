import * as React from 'react';
import Photo from '../../store/Photo';
import { Link } from 'react-router-dom';

interface Props {
    photo?: Photo;
    nextPhotoUrl?: string;
    prevPhotoUrl?: string;
    onOuterAreaClick: () => void;
}

const PhotoBigSize: React.StatelessComponent<Props> = props => {
    const { photo, prevPhotoUrl, nextPhotoUrl } = props;

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
                    to={ `${prevPhotoUrl}` }>&lt;</Link>
                {title}
                <Link className="photo-bigsize__next-photo-link btn btn-default"
                    to={ `${nextPhotoUrl}` }>&gt;</Link>
            </div>
        </div>
    </div>;
};

export default PhotoBigSize;
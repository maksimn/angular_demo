import * as React from 'react';
import Photo from '../../store/Photo';

interface Props {
    photo?: Photo;
}

const PhotoBigSize: React.StatelessComponent<Props> = props => {
    if (!props.photo)
       return null;

    const url = props.photo ? props.photo.url : '';
    const title = props.photo ? props.photo.title : '';

    return <div>
        <div className="photo-bigsize__shadow"></div>
            <div className="photo-bigsize">
            <img src={ url } />
            <div className="photo-bigsize__title">{ title }</div>
        </div>
    </div>;
};

export default PhotoBigSize;
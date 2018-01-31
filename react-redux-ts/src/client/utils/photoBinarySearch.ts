import Photo from '../store/Photo';

const photoBinarySearch = (photoId: number, photos: Photo[], left: number, right: number): number => {
    const { length } = photos;

    if (isNaN(photoId) || length - 1 < left || length - 1 < right) {
        return -1;
    }
    if (right - left < 2) {
        if (photos[left].id === photoId) {
            return left;
        }
        if (photos[left + 1].id === photoId) {
            return left + 1;
        }

        return -1;
    }

    const middleIndex = Math.round((right + left) / 2);
    const middlePhoto = photos[middleIndex];

    if (middlePhoto.id === photoId) {
        return middleIndex;
    } else if (middlePhoto.id > photoId) {
        return photoBinarySearch(photoId, photos, left, middleIndex);
    } else {
        return photoBinarySearch(photoId, photos, middleIndex, right);
    }
};

export default photoBinarySearch;
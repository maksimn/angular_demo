import axios from 'axios';

export const loadPhotoData = () => {
    return axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(response => (response.data));
};
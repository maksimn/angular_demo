var MAX_NUM_PHOTOS_PER_PAGE = 50;

function createPhotoView(photoData) {
    var photoView = document.createElement('div');
    var photoImg = document.createElement('img');
    var caption = document.createElement('div');

    photoView.classList.add('photo-view');

    photoImg.src = photoData.thumbnailUrl;
    caption.innerText = photoData.title;

    photoView.appendChild(photoImg);
    photoView.appendChild(caption);
    
    return photoView;
}

function setupPagination(photosNumber) {
    if (photosNumber > MAX_NUM_PHOTOS_PER_PAGE) {
        var numberPaginationLinks = Math.ceil(photosNumber / MAX_NUM_PHOTOS_PER_PAGE);
        var pagination = document.getElementById('pagination');
        for (var i = 0; i < numberPaginationLinks; i++) {
            var a = document.createElement('a');
            a.href = '/photos#' + (i + 1);
            a.innerText = (i + 1);
            a.className = "pagination-link";
            pagination.appendChild(a);
        }
    }
}

function showPhotos(photosData, begin, end) {
    var photosView = document.getElementById('photos');

    photosData
        .slice(begin, end)
        .forEach(function(photoData) {
            var photoView = createPhotoView(photoData);
            photosView.appendChild(photoView);
        });
}

window.addEventListener('load', function() {
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", 'https://jsonplaceholder.typicode.com/photos', true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var photosData = JSON.parse(xhr.responseText);

            setupPagination(photosData.length);
            showPhotos(photosData, 0, MAX_NUM_PHOTOS_PER_PAGE);
            
        } else if (xhr.readyState === 4 && xhr.status === 400) {
            alert('Упс, не удалось получить фотографии :(');
        }
    };

    xhr.send();
}, false);
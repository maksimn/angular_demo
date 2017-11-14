interface PhotoInfo {
    albumId?: number,
    id?: number,
    title: string,
    url?: string,
    thumbnailUrl: string
}

var MAX_NUM_PHOTOS_PER_PAGE = 50;
var currentPage = 1;
var photosData: PhotoInfo[];

var setCurrentPage = function (str: string) {
    if (str === "") {
        currentPage = 1;
        return;
    }

    currentPage = parseInt(str);
    if (isNaN(currentPage)) {
        window.location.href = 'error';
    }
}

function createPhotoView(photoData: PhotoInfo) {
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

function paginationLinkClickHandler(event: Event) {
    var a = <HTMLLinkElement>(event.target);
    document.querySelector('.pagination-link.active').classList.remove('active');
    a.classList.add('active');
    setCurrentPage(a.innerText);

    showPhotos(MAX_NUM_PHOTOS_PER_PAGE * (currentPage - 1), MAX_NUM_PHOTOS_PER_PAGE * currentPage);
}

function setupPagination(photosNumber: number) {
    if (photosNumber > MAX_NUM_PHOTOS_PER_PAGE) {
        var numberPaginationLinks = Math.ceil(photosNumber / MAX_NUM_PHOTOS_PER_PAGE);
        var pagination = document.getElementById('pagination');

        for (var i = 1; i <= numberPaginationLinks; i++) {
            var a = document.createElement('a');
            a.href = '/photos#' + i;
            a.innerText = i.toString();
            a.classList.add('pagination-link');
            a.addEventListener('click', paginationLinkClickHandler, false);
            pagination.appendChild(a);

            if (currentPage === i) {
                a.classList.add('active');
            }
        }
    }
}

function showPhotos(begin: number, end: number) {
    var photosView = document.getElementById('photos');

    while (photosView.firstChild) {
        photosView.removeChild(photosView.firstChild);
    }

    photosData
        .slice(begin, end)
        .forEach(function(photoData) {
            var photoView = createPhotoView(photoData);
            photosView.appendChild(photoView);
        });
}

window.addEventListener('load', function() {
    setCurrentPage(window.location.hash.substring(1));

    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", 'https://jsonplaceholder.typicode.com/photos', true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            photosData = JSON.parse(xhr.responseText);

            setupPagination(photosData.length);
            showPhotos(MAX_NUM_PHOTOS_PER_PAGE * (currentPage - 1), MAX_NUM_PHOTOS_PER_PAGE * currentPage);

        } else if (xhr.readyState === 4 && xhr.status === 400) {
            window.location.href = "/error";
        }
    };

    xhr.send();
}, false);
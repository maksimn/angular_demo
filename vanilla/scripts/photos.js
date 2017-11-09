window.addEventListener('load', function() {
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", 'https://jsonplaceholder.typicode.com/photos', true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var photosData = JSON.parse(xhr.responseText);

            console.log(photosData);
        } else if (xhr.readyState === 4 && xhr.status === 400) {
            console.log('error!!!!');
        }
    };

    xhr.send();
}, false);
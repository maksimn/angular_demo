window.addEventListener('load', () => {
    var loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var form = e.target;
        var username = form.username.value;
        var password = form.password.value;

        var loginData = JSON.stringify({
            username: username,
            password: password
        });

        var xhr = new XMLHttpRequest();

        xhr.open("POST", '/login', true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var authToken = xhr.getResponseHeader('x-auth');
                if (!authToken) {
                    throw new Error('Exception: AUTH Header not found');
                }

                createCookie('x-auth', authToken, 30);

                window.location.href = 'photos';
            } else if (xhr.readyState === 4 && xhr.status === 400) {
                var result = JSON.parse(xhr.responseText);
                var validationErrors = result.validationErrors;
                
                var validationErrorsDiv = document.getElementById('validationErrors');
                validationErrorsDiv.classList.remove('hidden');
                
                validationErrorsDiv.innerHTML = '';
                validationErrors.forEach(err => {
                    validationErrorsDiv.innerHTML += '<div>* ' + err + '</div>';
                });
            }
        };

        xhr.send(loginData);

    }, false);
}, false);
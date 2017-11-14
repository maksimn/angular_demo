window.addEventListener('load', () => {
    var registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var username = registerForm['username'].value;
        var password = registerForm['password'].value;
        var confirmPassword = registerForm['confirmPassword'].value;

        var json = JSON.stringify({
            username: username,
            password: password,
            confirmPassword: confirmPassword
        });

        var xhr = new XMLHttpRequest();

        xhr.open("POST", '/register', true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);

                alert('Пользователь ' + result.name + ' успешно зарегистрирован.');

                window.location.href = 'login';
            } else if (xhr.readyState === 4 && xhr.status === 400) {
                var result = JSON.parse(xhr.responseText);
                var validationErrors = result.validationErrors;
                
                var validationErrorsDiv = document.getElementById('validationErrors');
                validationErrorsDiv.classList.remove('hidden');
                
                validationErrorsDiv.innerHTML = '';
                validationErrors.forEach(err => {
                    validationErrorsDiv.innerHTML += '<div>* ' + err.errorMessage + '</div>';
                });
            }
        };

        xhr.send(json);

    }, false);
    
}, false);
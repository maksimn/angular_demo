const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname));
app.use(bodyParser.json());

// List of app users
// user schema: { id: some_id, name: some_name, password: some_password, token: some_token };
const users = []; 

const validateRegistrationData = registrationData => {
    let {username, password, confirmPassword} = registrationData;
    const validationErrors = [];

    if (!validator.isAlpha(username)) {
        validationErrors.push({
            field: 'username',
            errorMessage: 'Имя пользователя может содержать только латинские символы'
        });
    }
    if (!validator.isLength(username, { min: 2, max: 30 })) {
        validationErrors.push({
            field: 'username',
            errorMessage: 'Имя пользователя не должно содержать менее 2 и более 30 символов'
        });
    }
    if (!validator.isAlphanumeric(password)) {
        validationErrors.push({
            field: 'password',
            errorMessage: 'Пароль может содержать только латинские символы или числа'
        });
    }
    if (!validator.isLength(password, { min: 4, max: 25 })) {
        validationErrors.push({
            field: 'password',
            errorMessage: 'Пароль должен содержать не менее 4 и не более 25 символов'
        });
    }
    if (password != confirmPassword) {
        validationErrors.push({
            field: 'confirmPassword',
            errorMessage: 'Пароль и его повтор должны совпадать'
        });
    }

    return validationErrors.length ? validationErrors : null;
};

const authMiddleware = (req, res, next) => {
    const authToken = req.get('x-auth');
    const isAuthorized = authToken && users.some(user => user.token === authToken);
    const url = req.url;
    
    if (isAuthorized && (url === '/login' || url === '/register')) {
        res.redirect('/photos');
    } else if (!isAuthorized && (url === '/photos' || url === '/profile')) {
        res.redirect('/login');
    } else {
        next();
    }
};

// app paths begin
app.get('/', (req, res) => {
    res.render('layout', { page: 'index' });
});

app.get('/login', authMiddleware, (req, res) => {
    res.render('layout', { page: 'login' });
});

app.get('/register', authMiddleware, (req, res) => {
    res.render('layout', { page: 'register' });
});

app.get('/photos', authMiddleware, (req, res) => {
    res.render('layout', { page: 'photos' });
});

app.get('/profile', authMiddleware, (req, res) => {
    res.render('layout', { page: 'profile' });
});

app.get('*', (req, res) => {
    res.render('layout', { page: 'error' });
});

app.post('/register', (req, res) => {
    const {username, password, confirmPassword} = req.body;

    const validationErrors = validateRegistrationData({
        username, password, confirmPassword
    });

    if (validationErrors) {
        res.status(400).send({validationErrors});
    } else {
        users.push({
            id: users.length, 
            name: username, 
            password
        });
        res.status(200).send({username});
    }
});
// app paths end

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

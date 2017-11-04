const express = require('express');
const bodyParser = require('body-parser');

const {validateRegisterFormData} = require('./common/validate');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname));
app.use(bodyParser.json());

// List of app users
// user schema: { id: some_id, name: some_name, token: some_token };
const users = []; 

const authMiddleware = (req, res, next) => {
    const authToken = req.get('x-auth');
    const isAuthorized = users.some(user => user.token === authToken);
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

    const validationErrors = validateRegisterFormData({username, password, confirmPassword});

    if (validationErrors) {
        res.status(400).send({validationErrors});
    } else {
        res.status(200).send({username});
    }
});
// app paths end

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

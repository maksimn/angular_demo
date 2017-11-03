const express = require('express');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

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
// app paths end

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

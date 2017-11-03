const express = require('express');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

// app paths begin
app.get('/', (req, res) => {
    res.render('layout', { page: 'index' });
});

app.get('/login', (req, res) => {
    res.render('layout', { page: 'login' });
});

app.get('/register', (req, res) => {
    res.render('layout', { page: 'register' });
});

app.get('/photos', (req, res) => {
    res.render('layout', { page: 'photos' });
});

app.get('/profile', (req, res) => {
    res.render('layout', { page: 'profile' });
});

app.get('*', (req, res) => {
    res.render('layout', { page: 'error' });
});
// app paths end

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

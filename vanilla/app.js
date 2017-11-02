const express = require('express');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('layout', { page: 'index' });
});

const routes = ['/index', '/login', '/photos', '/profile', '/register'];

routes.forEach(route => {
    app.get(route, (req, res) => {
        res.render('layout', { page: route.substring(1) });
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

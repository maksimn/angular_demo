const express = require('express');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('../layout', { page: 'index' });
});

app.get('/:page', (req, res) => {
    res.render('../layout', { page: req.params.page });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

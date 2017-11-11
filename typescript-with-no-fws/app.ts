/// <reference path="./node_modules/@types/express/index.d.ts" />
import * as express from "express";

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('layout', { page: 'index', user: null });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
const express = require('express');

const app = express();
const port = 8000;

app.use(express.static(__dirname + '/pages'));
app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

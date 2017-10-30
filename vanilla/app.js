const express = require('express');

const app = express();
const port = 8000;

app.use(express.static('./pages/'));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

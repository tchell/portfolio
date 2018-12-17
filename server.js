/* Serves a single index file
License: MIT see file 'LICENSE'
*/
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const index = __dirname + '/views/index.html';
const static_content = __dirname + '/public';
const bootstrap = __dirname + 'node_modules/bootstrap/dist/css/';

app.use(express.static(static_content));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('/', (req, res) => {
    res.sendFile(index);
});

app.listen(port, () => {
    console.log("Portfolio listening on port " + port);
});
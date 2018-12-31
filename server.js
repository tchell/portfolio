/* Serves a single index file
License: MIT see file 'LICENSE'
*/
const express = require('express');
const app = express();
const validator = require('express-validator');
const bodyParser = require("body-parser");
const contact = require('./routes/contact');


const port = process.env.PORT || 3000;
const index = __dirname + '/views/index.html';
const static_content = __dirname + '/public';

const middleware = [
    express.static(static_content),
    express.static(__dirname + '/node_modules/bootstrap/dist/css'),
    express.static(__dirname + '/node_modules/jquery/dist/'),
    bodyParser.urlencoded({ extended: false }),
    validator()
    ];

app.use(middleware);

app.post('/submit', contact);

app.get('/', (req, res) => {
    res.sendFile(index);
});

app.listen(port, () => {
    console.log("Portfolio listening on port " + port);
});
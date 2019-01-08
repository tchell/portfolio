/* Serves a single index file
License: MIT see file 'LICENSE'
*/
const express = require('express');
const app = express();
const validator = require('express-validator');
const bodyParser = require("body-parser");
const contact = require('./routes/contact');
const fs = require('fs');
const projects = require('./projects');


app.set('views', './views');
app.set('view engine', 'pug');

const port = process.env.PORT || 3000;
const index = __dirname + '/views/index.html';
const static_content = __dirname + '/public';

app.enable('trust proxy');

// log all requests
app.use('/', (req, res, next) => {
    let log_file;
    let new_line = req.method + ' ' + req.path + ' - ' + req.ip + '\n';
    if (req.method === 'POST') {
        log_file = '.post_request.log';
    } else if (req.path === '/') {
        log_file = '.get_request.log';
    } else {
        log_file = '.misc_request.log';
    }
    fs.appendFile(log_file, new_line, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("New " + req.method + " request logged...", req.path);
        }
    });
    next();
});

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
    res.render('index', {projects_json: projects});
});

app.listen(port, () => {
    console.log("Portfolio listening on port " + port);
});
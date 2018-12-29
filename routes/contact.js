// Contact form module
const express = require('express');
const { body, validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
const router = express.Router();

router.post('/submit', [
    /*
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('text')
        .not().isEmpty()
        .trim()
        .escape(),
        */
    (req, res) => {
        req.checkBody('email', 'Enter a valid email address.')
            .isEmail();
        req.sanitizeBody('email')
            .normalizeEmail()
            .trim();
        req.sanitizeBody('message')
            .escape()
            .trim();
        let errors = req.validationErrors();
        if (errors) {
            res.send(errors);
        } else {
            console.log(req.url, req.body.message);
            res.redirect('/#contact');
        }
    }]
);

module.exports = router;
/* Receives and processes POST from contact from
License: MIT see file 'LICENSE'
*/
// Contact form module
const express = require('express');
const nodemailer = require('nodemailer');
const clientID = require('../client_id');
const router = express.Router();

router.post('/submit', [
    (req, res) => {
        req.sanitizeBody('email')
            .normalizeEmail()
            .trim();
        req.sanitizeBody('message')
            .escape()
            .trim();
        let errors = req.validationErrors();
        if (errors) {
            res.redirect('/#contact');
        } else {
            const smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    type: "OAuth2",
                    user: "tanner.chell@gmail.com",
                    clientId: clientID.client_id,
                    clientSecret: clientID.client_secret,
                    refreshToken: clientID.refresh
                }
            });
            let message = "from: " + req.body.name + " (" + req.body.email + ")<br>\n\r" + req.body.message;
            let mailOptions = {
                from: {
                    name: req.body.name,
                    address: req.body.email
                },
                to: "tanner.chell@gmail.com",
                subject: "New message from " + req.body.name,
                text: message,
                html: message
            };

            smtpTransport.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(response)
                }
                smtpTransport.close();
            });
            res.redirect('/#contact');
        }
    }]
);

module.exports = router;
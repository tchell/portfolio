
const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const keys = require("../keys");
const router = express.Router();

router.post('/reCaptcha', [
    (req, res) => {
        let url = "https://www.google.com/recaptcha/api/siteverify";
        let body = {
            secret: keys.reCaptchaSecret,
            response: req.body.token
        };
        let config = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        };
        axios.post(url, querystring.stringify(body), config).then((response) => {
            console.log(response);
            if (response.data.success === true) {
                res.status(200).send({ success: true });
            } else {
                console.log(response.data["error-codes"]);
                res.status(500).send({ success: false });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ success: false });
        });
    }
]);

module.exports = router;
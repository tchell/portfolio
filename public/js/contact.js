
var onRecaptchaLoad = function () {
    grecaptcha.ready(function () {
        grecaptcha.render('recaptcha', { 'sitekey': '6LdvjpkUAAAAAE6HxyvlRUQYjEITWoNzEqy-TZTE' }
        );
    })
}

var recaptchaCompleted = function (token) {
    body = { token: token };
    $.post('/reCaptcha', body, (data, status) => {
        if (data.success === true) {
            $("#submit").prop("disabled", false)
                .addClass("btn-primary");
        }
    });
}

$(document).ready(function () {
    $("#contact-form").submit(function (event) {
        grecaptcha.reset();
    });
});
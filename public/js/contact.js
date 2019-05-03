
var onRecaptchaLoad = function() {
    grecaptcha.ready(function() {
        grecaptcha.render('recaptcha', { 'sitekey': '6LdvjpkUAAAAAE6HxyvlRUQYjEITWoNzEqy-TZTE'}
        );
    })
}

var recaptchaCompleted = function() {
    $("#submit").prop("disabled", false);
}

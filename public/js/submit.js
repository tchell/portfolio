$(document).ready(function() {
    console.log("hello jQuery");
    $("#submit").click(function() {
        $("test-form").post('/',
            {"message": $("#test").val()}
        )
    });
});
$(document).ready(function () {
    $(".error").hide();
    //$("#logged-in").hide();
    $("#logged-out").hide();

    $(".CHANGESCREEN").click(function () {
        $("#logged-in").animate({ width: 'toggle' }, 700, function () {
            $(this).show();
        });
        $("#logged-out").animate({ width: 'toggle' }, 700, function () {
            $(this).hide();
        });
    })
    /////////////////////////TO BE REMOVED AT PUBLISH/////////////////////
    $(".CHANGESCREEN2").click(function () {
        $("#logged-out").animate({ width: 'toggle' }, 700, function () {
            $(this).show();
        });
        $("#logged-in").animate({ width: 'toggle' }, 700, function () {
            $(this).hide();
        });
    })
    ///////////////////////////////////////////////////////////////////////
});


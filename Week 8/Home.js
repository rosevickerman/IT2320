GetPlayerInformation = function ()
{

    $.ajax
    ({
        url: "Home/GetPlayerInformation",
        data: { PlayerNumber: $(".player-number-textbox").children("input").val() },
        success: function (response) { $(".output").html(response); }
    });
}

$(document).ready(function () {
    $(".player-number-button").click(function () {
        $.ajax(GetPlayerInformation());
    });
});
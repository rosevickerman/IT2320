var selection;
var oldselection;
var firstclick = true;

Select = function () {
    var select = $(selection);

    if (firstclick == true) //If it's the first click
    {
        if ($(select).hasClass("piece")) //if cell contains piece
        {
            select.css("border-color", "red"); //Highlights piece
            oldselection = select;
            firstclick = (!firstclick); //Changes to second click
        }

    }
    else //If it's the second click
    {
        oldselection.css("border-color", "black"); //Removes highlight
        var oldpiece = oldselection.css("background-image");
        oldselection.removeClass("piece red black"); //removes piece from old cell
        oldselection.css("background-image", ""); //removes image from old cell
        select.addClass("piece"); //adds piece class to cell
        select.css({"background-image": oldpiece, "background-size": "75px", 
            "background-position": "center", "background-origin": "content-box",
            "background-repeat": "no-repeat"}); //adds old piece image to selection
        firstclick = (!firstclick); //Changes to first click
    }
}

$(document).ready(function ()
{
    var cells = $(".cell");
    var colorCount = 0;

    for (var i = 0; i < cells.length; i++)
    {
        var cell = $(cells[i]);
        var isDark = colorCount % 2 == 0;
        var isNextRow = (i + 1) % 8 == 0;
        colorCount += isNextRow ? 2 : 1;
        cell.css("background-color", isDark ? "navy" : "white");
    }

    $(".cell").click(function () {
        selection = this;
        Select();
    }); 
});
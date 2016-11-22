$(function () {
    var carousel;
    var canvas;
    var x = 50;
    var y = 50;
    var w = 200;
    var h = 200;
    var draggable = false;
    var dragXOffset = 0;
    var velocity = 0;
    var direction = 0;
    var xCoordinates = new Array();
    var sampleSize = 10;
    var canvasElement = document.getElementById('carousel');
    var offset = 25;
    var selected = 0;
    var down = 0;
    var Image1 = new Image();
    Image1.src = "Images/img1.png";
    var Image2 = new Image();
    Image2.src = "Images/img2.png";
    var Image3 = new Image();
    Image3.src = "Images/img3.png";
    var Image4 = new Image();
    Image4.src = "Images/img4.png";
    var Image5 = new Image();
    Image5.src = "Images/img5.png";
    var Image6 = new Image();
    Image6.src = "Images/img6.png";
    var Image7 = new Image();
    Image7.src = "Images/img7.png";
    var Images = new Array(Image1, Image2, Image3, Image4, Image5, Image6, Image7); //adds images to array

    function picture(x, y, w, h, i) //draws pictures
    {
        canvas.drawImage(Images[Math.abs(i % 7)], x, y, w, h);
    }

    function clear() //clears canvas
    {
        canvas.clearRect(0, 0, 900, 400);
    }

    function create() //initializes canvas
    {
        carousel = document.getElementById("carousel");
        canvas = carousel.getContext("2d");
        return setInterval(draw, 10); //re-renders canvas every .01 second
    }

    function draw() //Redraws pictures
    {
        xCoordinates.push(x); //adds another x coord to xCoord array

        while (xCoordinates.length > sampleSize) xCoordinates.shift(); //shifts old x coord out
        clear(); //clears canvas

        if (!draggable && velocity > 0) //after realeasing mouse
        {
            if (direction == 1) //increases x coord based on velocity
            {
                x += velocity / 20;
            }
            else //decreaase x coord based on velocity
            {
                x -= velocity / 20;
            }

            for (var i = 0; i < 7; i++) //checks closest image to middle and sets as selected
            {
                var calulatedX = getXCoordinate(i);
                var placedX = Math.round((calulatedX - 50) / 200) * 250 + 50;
                if (placedX == 300)
                {
                    selected = i;
                }  
            }
            //draws images on canvas
            var location = selected - 2;
            if (location < 0)
                location = location + 7;
            picture(-175, 100, w, h, location);

            location = selected - 1;
            if (location < 0)
                location = location + 7;
            picture(75, 100, w, h, location);

            picture(300, 75, 250, 250, selected);

            location = selected + 1;
            if (location > 7)
                location = location - 7;
            picture(575, 100, w, h, location);

            location = selected + 2;
            if (location > 7)
                location = location - 7;
            picture(825, 100, w, h, location);

            velocity -= 1; //decreases speed
        }
        else //currently dragging, or if not moving boxes
        {

            for (var i = 0; i < 7; i++) //checks closest image to middle and sets as selected
            {
                var calulatedX = getXCoordinate(i);
                var placedX = Math.round((calulatedX - 50) / 200) * 250 + 50;
                if (placedX == 300) {
                    selected = i;
                }
            }
            //draws images on canvas
            var location = selected - 2;
            if (location < 0)
                location = location + 7;
            picture(-175, 100, w, h, location);

            location = selected - 1;
            if (location < 0)
                location = location + 7;
            picture(75, 100, w, h, location);

            picture(300, 75, 250, 250, selected);

            location = selected + 1;
            if (location > 7)
                location = location - 7;
            picture(575, 100, w, h, location);

            location = selected + 2;
            if (location > 7)
                location = location - 7;
            picture(825, 100, w, h, location);
        }
    }

    function myMove(e)//sets what x coord is after mouse is moved
    {
        if (draggable) {
            x = getMouseX(e) - dragXOffset;
        }
    }
    
    function myDown(e) //on clicking down
    {
        down = getMouseX(e);
        draggable = true; //allows dragging
        addMoveListener(); //tracks when mouse is moved
        return;
        
    }

    function getXCoordinate(n) {
        return x + (w * n) + n;
    }

    function myUp(e) { //on releasing mouse
        var up = getMouseX(e);
        velocity = Math.abs(down - up);
        
        if (down < up) //checks direction
            direction = 1;
        else
            direction = 0;
        draggable = false; //stop dragging
        carousel.onmousemove = null;
    }

    function getMouseX(e) {
        if (e.touches === undefined) {
            return e.pageX - carousel.offsetLeft;
        }
        return e.touches[0].pageX - carousel.offsetLeft;
    }

    function addStartListener() //recognizes clicking down
    {
        canvasElement.addEventListener('touchstart', function (e) { e.preventDefault(); myDown(e); }, false);
        canvasElement.addEventListener('mousedown', function (e) { e.preventDefault(); myDown(e); }, false);
    }

    function addEndListener() //recognizes releasing click
    {
        canvasElement.addEventListener('touchend', function (e) { e.preventDefault(); myUp(e); }, false);
        canvasElement.addEventListener('mouseup', function (e) { e.preventDefault(); myUp(e); }, false);
    }

    function addMoveListener() //recognizes when mouse is moved
    {
        canvasElement.addEventListener('touchmove', function (e) { myMove(e); }, false);
        canvasElement.addEventListener('mousemove', function (e) { myMove(e); }, false);
    }

    create();
    addStartListener();
    addEndListener();
});
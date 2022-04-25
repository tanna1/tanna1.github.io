$(document).ready(function(){

    var imageDpi = 1/13;

    var can = document.getElementById('canvas');
    var distout = document.getElementById('distout');
    var speedin = document.getElementById('speedin');
    var timeout = document.getElementById('timeout');
    var ctx = can.getContext('2d');
    ctx.font = '15px serif';
    var startX, startY, physicalLength;

    $("canvas").mousedown(function(event){
        startX = event.pageX;
        startY= event.pageY;

        $(this).bind('mousemove', function(e){
            drawLine(startX, startY, e.pageX, e.pageY);
            distout.innerHTML = "Distance: " + Math.round(physicalLength) + " km / " + Math.round(physicalLength/1.609) + " miles";
            setTime();
        });
    }).mouseup(function(){
        $(this).unbind('mousemove');
    });

    $("#speedin").on("input", function(){
        setTime();
    });

    function drawLine(x, y, stopX, stopY){
        ctx.clearRect (0, 0, can.width, can.height);
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(stopX, stopY);
        ctx.closePath();
        ctx.stroke();

        // calculate length   
        var pixelLength = Math.sqrt(Math.pow((stopX - x),2) + Math.pow((stopY-y),2));
        physicalLength = pixelLength / imageDpi;

        ctx.fillStyle = "#FFFFFF";

        var xPos = Math.min(stopX, 930);
        var yPos = Math.min(stopY, 700);

        ctx.fillText((Math.round(physicalLength) + " km"), xPos, yPos+25);
        ctx.fillText((Math.round(physicalLength/1.609) + " miles"), xPos, yPos+40);
    }

    function setTime(){
        if (speedin.value != "" && speedin.value > 0){
            var timeh = physicalLength/speedin.value;
            timeout.innerHTML = "Time: " + Math.floor(timeh) + "h " + Math.round((timeh % 1)*60) + "m";
        }
        else
            timeout.innerHTML = "Time: NaN";
    }
});
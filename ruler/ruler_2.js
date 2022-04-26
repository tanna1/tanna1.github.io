$(document).ready(function(){

    var can = document.getElementById('canvas');
    can.width = Math.max(1024,window.innerWidth);
    can.height = Math.max(768,window.innerWidth * 0.75);
    var distout = document.getElementById('distout');
    var speedin = document.getElementById('speedin');
    var timeout = document.getElementById('timeout');
    var ctx = can.getContext('2d');
    ctx.font = '15px arial';
    var startX, startY, physicalLength;
    var hasStart = false;

    var imageDpi = can.width/13000;

    if(window.matchMedia("(max-width: 767px)").matches){
        // This is a mobile device.
        $("canvas").click(function(event){
            console.log("click");
            if (!hasStart){
                console.log(1 + " " + startX + " " + startY);
                startX = event.offsetX-1;
                startY = event.offsetY-1;
                hasStart = true;

                ctx.clearRect (0, 0, can.width, can.height);
                drawCircle(startX, startY);
            }
            else{
                console.log(2 + " " + startX + " " + startY);
                calculateLength(startX, startY, event.offsetX-1, event.offsetY-1);
                draw(startX, startY, event.offsetX-1, event.offsetY-1);
                distout.innerHTML = "Distance: " + Math.round(physicalLength) + " km / " + Math.round(physicalLength/1.609) + " miles";
                setTime();
                hasStart = false;
            }
        });
    } else{
        // This is a tablet or desktop
        $("canvas").mousedown(function(event){
            startX = event.offsetX-1;
            startY = event.offsetY-1;
    
            $(this).bind('mousemove', function(e){
                calculateLength(startX, startY, e.offsetX-1, e.offsetY-1);
                draw(startX, startY, e.offsetX-1, e.offsetY-1);
                distout.innerHTML = "Distance: " + Math.round(physicalLength) + " km / " + Math.round(physicalLength/1.609) + " miles";
                setTime();
            });
        }).mouseup(function(){
            $(this).unbind('mousemove');
        });
    }

    $("#speedin").on("input", function(){
        setTime();
    });

    function draw(x, y, stopX, stopY){
        ctx.clearRect (0, 0, can.width, can.height);
        ctx.fillStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(stopX, stopY);
        ctx.closePath();
        ctx.stroke();

        drawCircle(x,y);
        drawCircle(stopX, stopY);

        ctx.fillStyle = "#FFFFFF";

        var xPos = Math.min(stopX, can.width * .94);
        var yPos = Math.min(stopY, can.height * .955);

        ctx.fillText((Math.round(physicalLength) + " km"), xPos, yPos+20);
        ctx.fillText((Math.round(physicalLength/1.609) + " miles"), xPos, yPos+35);
    }

    function drawCircle(x,y){
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillStyle = "#FFFFFF"
        ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        lineWidth = 1.5;
        ctx.fillStyle = "#000000"
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function calculateLength(x, y, stopX, stopY){
        var pixelLength = Math.sqrt(Math.pow((stopX - x),2) + Math.pow((stopY-y),2));
        physicalLength = pixelLength / imageDpi;
    }

    function setTime(){
        if (speedin.value != "" && physicalLength > 0 && speedin.value > 0){
            var timeh = physicalLength/speedin.value;
            timeout.innerHTML = "Time: " + Math.floor(timeh) + "h " + Math.round((timeh % 1)*60) + "m";
        }
        else
            timeout.innerHTML = "Time: NaN";
    }
    
});
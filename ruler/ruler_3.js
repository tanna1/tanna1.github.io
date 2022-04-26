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

    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

    if(isMobile){//window.matchMedia("(max-width: 767px)").matches){
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
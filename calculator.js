let m;
let n;
let lastOp;
let operation;
let output;
let resultBtn;
let mode;
window.onload = function(){
    n = 0;
    m = 0;
    mode = "none";
    resultBtn = document.getElementById("btn_Result");
    lastOp = document.getElementById("last");
    operation = document.getElementById("operation");
    output = document.getElementById("output");
    updateOutput();
}

function addNumber(number) {
    if (n.toString().length <= 15){

        if (n == 0){
            n = "";
        }
        n+=number.toString();
        console.log(number);
        updateOutput()
    }
}

function setNumber(number){
    n = number;
    updateOutput();
}

function minus(){
    n = n.toString().slice(0, -1);
    if (n == "")
        n = 0;
    updateOutput();
}

function result(){
    console.log("RESULT");
    switch (mode){
        case "plus":
            n = parseFloat(m) + parseFloat(n);
            break;
        case "minus":
            n = parseFloat(m) - parseFloat(n);
            break;
        case "multiply":
            n = parseFloat(m) * parseFloat(n);
            break;
        case "divide":
            if (n == "0")
            {
                n = "NaN";
                break;
            }
            n = parseFloat(m) / parseFloat(n);
            break;
        case "modulus":
            n = parseFloat(m) % parseFloat(n);
            break;
        default:
            return;
    }
    mode = "none";
    m = 0;
    updateOutput();
}

function clearAll(){
    console.log("CLEAR");
    n = 0;
    m = 0;
    mode = "none";
    updateOutput();
}

function setMode(modeP){
    switch (mode){
        case "plus":
            m = parseFloat(m) + parseFloat(n);
            break;
        case "minus":
            m = parseFloat(m) - parseFloat(n);
            break;
        case "multiply":
            m = parseFloat(m) * parseFloat(n);
            break;
        case "divide":
            m = parseFloat(m) / parseFloat(n);
            break;
        case "modulus":
            m = parseFloat(m) % parseFloat(n);
            break;
        default:
            m = n;
    }
    n = 0;
    console.log(modeP);
    mode = modeP;
    updateOutput();
}

function updateOutput(){
    lastOp.textContent = m != 0 ? parseFloat(parseFloat(m).toFixed(3)) : '\xa0';
    switch (mode){
        case "none":
            operation.textContent = '\xa0';
            break;
        case "plus":
            operation.textContent = "+";
            break;
        case "minus":
            operation.textContent = "-";
            break;
        case "multiply":
            operation.textContent = "*";
            break;
        case "divide":
            operation.textContent = "/";
            break;
        case "modulus":
            operation.textContent = "%";
            break;
    }
    output.textContent = parseFloat(parseFloat(n).toFixed(3));

    resultBtn.disabled = mode == "none";
}
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
    if (n.toString().length >= 15 || number == "." && n.toString().includes(".")){
        return;
    }

    if (n == 0){
        n = "";
    }
    n+=number.toString();
    updateOutput()
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
    n = parseFloat(n.toFixed(3));
    mode = "none";
    m = 0;
    updateOutput();
}

function clearAll(){
    n = 0;
    m = 0;
    mode = "none";
    updateOutput();
}

function setMode(modeP){
    switch (mode){
        case "plus":
            m = parseFloat((parseFloat(m) + parseFloat(n)).toFixed(3));
            break;
        case "minus":
            m = parseFloat((parseFloat(m) - parseFloat(n)).toFixed(3));
            break;
        case "multiply":
            m = parseFloat((parseFloat(m) * parseFloat(n)).toFixed(3));
            break;
        case "divide":
            m = parseFloat((parseFloat(m) / parseFloat(n)).toFixed(3));
            break;
        case "modulus":
            m = parseFloat((parseFloat(m) % parseFloat(n)).toFixed(3));
            break;
        default:
            m = n;
    }
    if (m.toString().length > 15){
        m = 0;
    }
    n = 0;
    mode = modeP;
    updateOutput();
}

function updateOutput(){
    lastOp.textContent = m != 0 ? m : '\xa0';
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
    if (n.toString().length > 15){
        n = 0;
        output.textContent = "Too long";
    }
    else
        output.textContent = n;

    resultBtn.disabled = mode == "none";
}
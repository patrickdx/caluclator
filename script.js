
let firstNum = null;
let secondNum = null; 
let operator = null; 

// Get DOM elements
const inputDisplay = document.getElementById("input-display");

const expressionDisplay = document.getElementById("expression-display");
const numbers = document.querySelectorAll(".btn.number");    
const operators = document.querySelectorAll(".btn.operator");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const equalsBtn = document.getElementById("equalsBtn");
const decimalBtn = document.getElementById("decimalBtn");

let eraseBefore = false;


clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", undoInput);
equalsBtn.addEventListener("click", equalOperator);
decimalBtn.addEventListener("click", decimalOperator); 

numbers.forEach(number => number.addEventListener("click", inputNumber)); 
operators.forEach(op => op.addEventListener("click", inputOperator)); 
document.addEventListener("keydown", keyboardInput); 


clearDisplay();

let isSecondInput = () => firstNum !== null && inputDisplay.textContent !== "" && !eraseBefore;

function clearDisplay() {
    inputDisplay.textContent = "0";
    expressionDisplay.textContent = "";

    firstNum = null;
    secondNum = null;
    sign = null;

}
function clearInputDisplay() {
    inputDisplay.textContent = "";
}

function undoInput() {
    inputDisplay.textContent = inputDisplay.textContent.slice(0, -1);
}

function keyboardInput(event) {
    // just bind the keyboard inputs to the button handlers 
    const key = event.key;
    if (["0","1","2","3","4","5","6","7","8","9"].includes(key)) {
        inputNumber({target: {textContent: key}});
    }
    else if (["+", "-", "*", "/"].includes(key)) {
        inputOperator({target: {textContent: key}});
    }

    switch (key) {
        case "Enter":
        case "=":
            equalOperator();
            break;
        case "Backspace":
            undoInput();
            break;
        case "Delete":
            clearDisplay();
            break;
        case ".":
            decimalOperator();
            break;
        case "Escape":
            clearDisplay();
            break;
    }
    
}


// for this one you want to display the entire expression ex: 9 + 2 = 
function equalOperator() {
    if (isSecondInput()) {
        secondNum = Number.parseFloat(inputDisplay.textContent);
        expressionDisplay.textContent = `${firstNum} ${sign} ${secondNum} =`;
        inputDisplay.textContent = evaluate();
        eraseBefore = true;
    }
}

function decimalOperator() {
    if (!eraseBefore) {
        if (!inputDisplay.textContent.includes(".")) {
            inputDisplay.textContent += ".";
        }
    }
}



/*
Intuition: Break it down into 3 seperate inputs: 
1. First number inpputed 
2. Operator inputted 
3. Second number inputted 

On operator input, store the first number in the input box 
User would then type in the 2nd number, on equals input, store the 2nd number, and perform the operation.
- Show the result in the input box, and show the entire expression in the expression box. 
- Special case: if doing something like 8 x 9 x 2, store result of 8 x 9 in input box. 


*/ 

function inputNumber(event) {
    if (eraseBefore) {
        clearInputDisplay();
        eraseBefore = false;
    }

    // get the number clicked
    const number = event.target.textContent; 
    if (inputDisplay.textContent === "0") inputDisplay.textContent = ""; 
     
    
    inputDisplay.textContent += number; 
}

// everytime an operator is inputted, add it to the expression 
function inputOperator(event) {
    const operator = event.target.textContent; 
    let num = Number.parseFloat(inputDisplay.textContent);

    // is it the first number or the second? 

    // if expression has already been built:  condense the expression => 9 x 9 x = 81 x
    if (isSecondInput()) {
        secondNum = num;
        firstNum = evaluate();      
        expressionDisplay.textContent = `${firstNum} ${operator} `;
        inputDisplay.textContent = firstNum;
    
    }

    // if expression has not been built yet 
    else {
        firstNum = num; 
        sign = operator;
        expressionDisplay.textContent = `${firstNum} ${operator} `;
    }

    eraseBefore = true;     // after displaying result, next number input will erase the display
    console.log(`firstNum: ${firstNum}, secondNum: ${secondNum}, sign: ${sign}`);

    
}


function evaluate() {
    let result = null; 
    switch (sign) {
        case "+":
            return firstNum + secondNum;
        case "-":
            return  firstNum - secondNum;
        case "*":
            return firstNum * secondNum;
        case "/":
            return firstNum / secondNum;
        default:
            console.log("No operator set");
    }

    
    return result; 
}

const listOfItems = document.getElementsByClassName("list-item");
const inputEl = document.getElementById("displayReslut");
const historyOne = document.getElementById("history1");
const historyTwo = document.getElementById("history2");
const historyThree = document.getElementById("history3");

function conviteDataType(value) {
    if (value.includes(".")) {
        return parseFloat(value)
    }
    return parseInt(value)
}

function addHistoryDetails() {
    historyOne.textContent = historyThree.textContent
    historyTwo.textContent = inputEl.textContent
    historyThree.textContent = ""
}

function findTotalEqual() {
    if (inputEl.textContent.trim().length !== 0) {
        if (inputEl.textContent[0] !== "=") {

            let listOfNumbers = inputEl.textContent.split(/[-+X/%]+/);
            listOfNumbers = listOfNumbers.filter((eachValue) => eachValue !== "");
            const arithmeticOperators = inputEl.textContent.match(/[-+X/%]+/g);
            let total = null
            if (inputEl.textContent[0] === "-") {
                total = -conviteDataType(listOfNumbers[0])
                arithmeticOperators.shift()
            } else {
                total = conviteDataType(listOfNumbers[0]);
            }
            for (let i = 0; i < listOfNumbers.length - 1; i++) {
                const operator = arithmeticOperators[i];
                const operand = conviteDataType(listOfNumbers[i + 1]);

                switch (operator) {
                    case "X":
                        total *= operand;
                        break;
                    case "+":
                        total += operand;
                        break;
                    case "-":
                        total -= operand;
                        break;
                    case "/":
                        total /= operand;
                        break;
                    case "%":
                        total %= operand;
                }
            }

            historyThree.textContent = inputEl.textContent;
            inputEl.textContent = "= " + total;
            inputEl.classList.add("increase-font");
        }
    } else {
        inputEl.textContent = "= 0";
    }
}

function checkNumbers(event) {
    if (inputEl.textContent[0] === "=" && ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(event.target.textContent)) {
        addHistoryDetails()
        inputEl.textContent = event.target.textContent
    } else if (inputEl.textContent.length === 1 && event.target.textContent !== "0") {
        if (inputEl.textContent !== "0") {
            inputEl.textContent = inputEl.textContent + event.target.textContent
        } else {
            inputEl.textContent = event.target.textContent
        }
    } else if (inputEl.textContent.length > 1) {
        inputEl.textContent = inputEl.textContent + event.target.textContent
    }
}

function checkArithmeticOperators(event) {
    if (inputEl.textContent[0] === "=" && ["X", "+", "-", "/", "%"].includes(event.target.textContent)) {
        addHistoryDetails()
        inputEl.textContent = inputEl.textContent.slice(2) + event.target.textContent
    } else if (["X", "+", "-", "/", "%"].includes(inputEl.textContent.slice(-1))) {
        inputEl.textContent = inputEl.textContent.slice(0, -1) + event.target.textContent
    } else {
        inputEl.textContent = inputEl.textContent + event.target.textContent
    }
}

const getTextContentOfEachIteam = (event) => {
    inputEl.classList.remove("increse-font")
    if (event.target.textContent === ".") {
        if (inputEl.textContent[0] === "=" && event.target.textContent === ".") {
            addHistoryDetails()
            inputEl.textContent = "0."
        }
        if (inputEl.textContent.slice(-1) !== ".") {
            inputEl.textContent = inputEl.textContent + "."
        }
    } else if (["X", "+", "-", "/", "%"].includes(event.target.textContent)) {
        checkArithmeticOperators(event)
    } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(event.target.textContent)) {
        checkNumbers(event)
    } else if (event.target.textContent === "=") {
        findTotalEqual()
    } else if (event.target.textContent === "C") {
        inputEl.textContent = "0"
    } else {
        if (inputEl.textContent[0] !== "=") {
            inputEl.textContent = inputEl.textContent.slice(0, -1)
        } else {
            inputEl.classList.add("increse-font")
        }
    }
}


for (let eachItems of listOfItems) {
    eachItems.addEventListener("click", getTextContentOfEachIteam)
}
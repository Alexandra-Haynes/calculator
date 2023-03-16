
// Tutorial by Web Dev Sinplified:


// ______________building the template_____________________________________________

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    //resetting the screen
  }

  delete() { 
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    //chopping off the last character
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return; //only one .
    this.currentOperand = this.currentOperand.toString() + number.toString();
    //adding next number to the tail
  }


  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    //getting ready for the next input
  }

  // ______________executing the actual calculation______________________________________

  calculate() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand); //converst string to float number
    if (isNaN(prev) || isNaN(current)) return; //checks if user doesnt enter number, only =
    switch (this.operation) {
      case "+":
        result = prev + current;
        break; //leave the switch completely
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// ______________selecting each html element__________________________________

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// ______________creating new instance_________________________________________

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// ______________adding events for the buttons__________________________________

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.calculate();
  calculator.updateDisplay();
});


allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
}); 


deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

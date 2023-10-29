class Calculator {
    constructor(previousoutputText, currentoutputText) {
        this.previousoutputText = previousoutputText;
        this.currentoutputText = currentoutputText;
        this.currentoutput = "";
        this.previousoutput = "";
        this.clear();
    }

    clear() {
        this.currentoutput = "";
        this.previousoutput = "";
        this.operation = null; 
        

    }

    delete() {
        this.currentoutput = "0";
    }

    appendNumber(number) {
        if (number === "." && this.currentoutput.includes(".")) {
            return;
        }
        this.currentoutput = this.currentoutput.toString() + number.toString(); 
    }

    chooseOperation(operation) {
        if(this.currentoutput === ""){
            return;
        }
        if(this.previousoutput !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousoutput = this.currentoutput;
        this.currentoutput = "";


    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousoutput);
        const curr = parseFloat(this.currentoutput);
        if(isNaN(prev) || isNaN(curr)){
            return;
        }

        if (this.operation === "+") {
            computation = prev + curr;
        } else if (this.operation === "-") {
            computation = prev - curr;
        } else if (this.operation === "*") {
            computation = prev * curr;
        } else if (this.operation === "/") {
            computation = prev / curr;
        } else {
            return;
        }
        this.currentoutput = computation;
        this.operation = null;
        this.previousoutput = "";

    }

    getdisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1]; 
       let integerDisplay;
       if (isNaN(integerDigits)) {
        integerDisplay = "";
      } else {
        integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }

    updateText() {
        this.currentoutputText.innerText = this.getdisplayNumber(this.currentoutput);
        if(this.operation !== null){
            this.previousoutputText.innerText = `${this.getdisplayNumber(this.previousoutput)} ${this.operation}`;
        }else{
            this.previousoutputText.innerText = "";
        }
        
    }
}

const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operation]');
const equalButton = document.querySelector('[equal]');
const deleteButton = document.querySelector('[delete]');
const allclearButton = document.querySelector('[all-clear]');
const previousoutputText = document.querySelector('[previous-output]');
const currentoutputText = document.querySelector('[current-output]');

const calculator = new Calculator(previousoutputText, currentoutputText);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateText();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateText();
    });
});

equalButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateText();

});

allclearButton.addEventListener("click",(button) =>{
    calculator.clear();
    calculator.updateText();

});

deleteButton.addEventListener("click",(button)=>{
    calculator.delete();
    calculator.updateText();
});

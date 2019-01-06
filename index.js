//var input1="0", input2 = "0";
/*
Use case 1: Arithmetic operations between single digit numbers
1. step on load calculator shows 0
2. onclick number button , number gets displayed and pushed in numbers array
3. if operator is clicked , its stored in operator array , and display operator.
4. onclick number button , number gets displayed and pushed in numbers array
5. on click of = perform following:
  a. retreieve first number from number array at 0 index
  b. get one operator from operator array at 0 index
  c. get 2 number from number array at 1 index.
  d. store and display the result by performing desired operation.
*/
/*
Use case 2: Arithmetic operations between multi digit numbers e.g. 123 + 425
1. step on load calculator shows 0
2. onclick number button , number gets displayed and pushed in numbers array till another operator is entered
3. if operator is clicked , its stored in operator array , and display operator.
4. onclick number button , number gets displayed and pushed in numbers array till = is entered
5. on click of = perform following:
  a. retreieve first number from number array at 0 index
  b. get one operator from operator array at 0 index
  c. get 2 number from number array at 1 index.
  d. store and display the result by performing desired operation.
*/
/* automatic execution
 when 1+ 4 should automatically show 5
  1. user press a number
  2.user press an operator
  3. user press 2nd number
  4.automatic result by calling onEqualOperator

*/
/* multi operator
 when 1+ 4+3 should give 8
  1. user press a number
  2.user press an operator
  3. user press 2nd number,
  4. after entering the number result is displayed automatically
  5. store the result
  6.user again enters an operator
  7.store the result and the operator in the inputNumber array
  8.user again enters a number
  9.now result is displayed automatically

*/
var calculator = {
  inputNumbers: [],
  currentOperator: '',
  expression: '',
  result: '',
  operatorsFunctionsMap: {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => a ^ b,
  },
  reset: function () {
    this.currentInputNumber = '';
    this.expression = '';
    this.inputNumbers = [];
    this.currentOperator = '';
    this.displayExpression('0');
    this.result = '';
    this.displayResult("");
  },
  init: function (calculatorContainer) {
    let displayNode = document.createElement("div");
    calculatorContainer.appendChild(displayNode);

    let expressionNode = document.createElement("span");
    expressionNode.innerText = '0';
    expressionNode.id = "expressionScreen";
    displayNode.appendChild(expressionNode);
    this.expressionNode = expressionNode;


    let resultNode = document.createElement("span");
    resultNode.innerText = " ";
    resultNode.id = "resultScreen";
    displayNode.appendChild(resultNode);
    this.resultNode = resultNode ;

    let numberBlock = document.createElement("div");
    calculatorContainer.appendChild(numberBlock);

    for( let i =0 ; i < 10 ; i++) {
      let numberButton = document.createElement("button");
      numberButton.innerText = i;
      numberButton.onclick = () => this.onNumberInput(i);
      numberBlock.appendChild(numberButton);
    }

    let numberButtonDecimal = document.createElement("button");
    numberButtonDecimal.innerText = ".";
    numberButtonDecimal.onclick = () => this.onNumberInput('.');
    numberBlock.appendChild(numberButtonDecimal);

    let operatorBlock = document.createElement("div");
    calculatorContainer.appendChild(operatorBlock);

    let operatorPlus = document.createElement("button");
    operatorPlus.innerText = "+";
    operatorPlus.onclick = () => this.onOperatorInput('+');
    operatorBlock.appendChild(operatorPlus);

    let operatorMinus = document.createElement("button");
    operatorMinus.innerText = "-";
    operatorMinus.onclick = () => this.onOperatorInput('-');
    operatorBlock.appendChild(operatorMinus);

    let operatorMultiply = document.createElement("button");
    operatorMultiply.innerText = "*";
    operatorMultiply.onclick = () => this.onOperatorInput('*');
    operatorBlock.appendChild(operatorMultiply);

    let operatorDivide = document.createElement("button");
    operatorDivide.innerText = "/";
    operatorDivide.onclick = () => this.onOperatorInput('/');
    operatorBlock.appendChild(operatorDivide);

    let operatorEqual = document.createElement("button");
    operatorEqual.innerText = "=";
    // operatorEqual.onclick = () => this.onEqualOperator();
    operatorEqual.onclick = () => this.onEqualOperatorExecution();
    operatorBlock.appendChild(operatorEqual);

    let clearButton = document.createElement("button");
    clearButton.innerText = "C" ;
    clearButton.onclick = this.reset.bind(this);
    calculatorContainer.appendChild(clearButton);

    // this.expressionNode = document.getElementById(expressionNodeId);
    // this.resultNode = document.getElementById(resultNodeId);
    // this.displayExpression('0');
  },
  onNumberInput: function(inputNum) {
  //  this.testInputNum.push(inputNum);
    if(this.expression == '' && (this.inputNumbers == [] && this.result !== '')) {
      this.displayExpression('');
      this.displayResult('');
       this.inputNumbers = [this.result] ;
       this.result = '';

     }
    this.currentInputNumber = inputNum;
    this.inputNumbers.push(inputNum);
    this.expression += inputNum.toString();
    this.displayExpression(this.expression);
    if (this.currentOperator !== "")  this.onEqualOperator();
  },
  onOperatorInput: function(inputOperator) {
    if(this.expression == '' && (this.inputNumbers == [] && this.result !== '')) {
       this.inputNumbers = [];
       this.inputNumbers = [this.result] ;
       this.expression += this.result.toString();
       this.result = '';
     }
    this.currentOperator = inputOperator;
    var inputNumbersLength=0;
    var expressionLength = this.expression.length;
    inputNumbersLength = this.inputNumbers.length;
    if (typeof(this.inputNumbers[inputNumbersLength-1]) == "string" && this.inputNumbers[inputNumbersLength-1] !== '.') {
      this.inputNumbers.pop();
      this.expression = this.expression.substring(0, expressionLength-1);
    }
    if (this.result !== "") this.inputNumbers = [this.result];
    this.inputNumbers.push(inputOperator);
    this.expression += inputOperator;
    this.displayExpression(this.expression);
  },
  onEqualOperator: function() {
    var currentOperatorPosition = this.inputNumbers.indexOf(this.currentOperator);
    var firstOperandArray = this.inputNumbers.slice(0, currentOperatorPosition);
    var secondOperandArray = this.inputNumbers.slice(currentOperatorPosition + 1);
    var firstOperand = Number(firstOperandArray.join(''));
    var secondOperand = Number(secondOperandArray.join(''));
    var result = this.operatorsFunctionsMap[this.currentOperator](firstOperand, secondOperand);
    this.result = result;
    this.displayResult(' = '+result);



  },

  onEqualOperatorExecution: function() {
  //   this.onEqualOperator();

    this.inputNumbers = [];
    this.expression = '' ;
    this.displayExpression(this.expression);
    this.displayResult(this.result);


  },

  displayExpression: function (expression){
    this.expressionNode.innerText = expression;
  },
  displayResult: function (result){
    this.resultNode.innerText = result;
  }
};

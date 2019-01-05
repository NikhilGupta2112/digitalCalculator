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
    this.expression = '';
    this.inputNumbers = [];
    this.inputOperator = [];
    this.displayExpression('0');
    this.displayResult("");
  },
  init: function (expressionNodeId, resultNodeId) {
    this.expressionNode = document.getElementById(expressionNodeId);
    this.resultNode = document.getElementById(resultNodeId);
    this.displayExpression('0');
  },
  onNumberInput: function(inputNum) {
    this.inputNumbers.push(inputNum);
    this.expression += inputNum.toString();
    this.displayExpression(this.expression);
    if (this.currentOperator !== "")  this.onEqualOperator();
  },
  onOperatorInput: function(inputOperator) {
    this.currentOperator = inputOperator;
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
    this.displayResult('= '+result);


  },
  displayExpression: function (expression){
    this.expressionNode.innerText = expression;
  },
  displayResult: function (result){
    this.resultNode.innerText = result;
  }
};

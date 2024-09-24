const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = null;
let previousInput = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;
        const buttonType = button.classList[0];

        if (buttonType === 'number' || buttonType === 'decimal') {
            currentInput += buttonValue;
            display.value = currentInput;
        } else if (buttonType === 'operator') {
            operator = buttonValue;
            previousInput = currentInput;
            currentInput = '';
        } else if (buttonType === 'clear') {
            currentInput = '';
            operator = null;
            previousInput = null;
            display.value = '';
        } else if (buttonType === 'equal') {
            if (previousInput !== null && operator !== null) {
                const result = calculate(previousInput, operator, currentInput);
                display.value = result;
                currentInput = result;
                operator = null;
                previousInput = null;
            }
        }
    });
});

function calculate(num1, op, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return 'Error';
    }
}

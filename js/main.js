// Get all the elements we need
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");

// Variables to store calculation states
let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

// Add click event listener to all buttons
buttons.forEach((button) => {
	button.addEventListener("click", () => {
		const buttonText = button.textContent;

		// Handle different button clicks
		if (buttonText >= "0" && buttonText <= "9") {
			handleNumber(buttonText);
		} else if (["+", "-", "*", "/"].includes(buttonText)) {
			handleOperator(buttonText);
		} else if (buttonText === "=") {
			handleEquals();
		} else if (buttonText === "C") {
			clearCalculator();
		}
	});
});

// Handle number input
function handleNumber(num) {
	if (shouldResetDisplay) {
		display.value = num;
		shouldResetDisplay = false;
	} else {
		display.value = display.value === "0" ? num : display.value + num;
	}

	if (operator === "") {
		firstNumber = display.value;
	} else {
		secondNumber = display.value;
	}
}

// Handle operator input
function handleOperator(op) {
	if (firstNumber !== "" && secondNumber !== "") {
		handleEquals();
	}
	operator = op;
	shouldResetDisplay = true;
	if (firstNumber === "") {
		firstNumber = display.value;
	}
}

// Handle equals button
function handleEquals() {
	if (firstNumber === "" || operator === "") return;

	if (secondNumber === "") {
		secondNumber = display.value;
	}

	const result = calculate(
		parseFloat(firstNumber),
		operator,
		parseFloat(secondNumber)
	);
	display.value = result;
	firstNumber = result.toString();
	secondNumber = "";
	operator = "";
	shouldResetDisplay = true;
}

// Calculate the result
function calculate(num1, operator, num2) {
	switch (operator) {
		case "+":
			return num1 + num2;
		case "-":
			return num1 - num2;
		case "*":
			return num1 * num2;
		case "/":
			return num2 !== 0 ? num1 / num2 : "Error";
		default:
			return num1;
	}
}

// Clear calculator
function clearCalculator() {
	display.value = "0";
	firstNumber = "";
	secondNumber = "";
	operator = "";
	shouldResetDisplay = false;
}
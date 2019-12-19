const { stdout } = process;
const { alphabetDimensions } = require("./dimensions");

const printAt = (str, x, y) => {
	stdout.cursorTo(x, y);
	stdout.write(str);
};

const printGivenAlphabet = function(dimensions) {
	if (dimensions.length == 0) return;
	let position = dimensions.shift();
	printAt("*", position[0], position[1] - 10);
	printGivenAlphabet(dimensions);
};

const printAlphabets = function() {
	const dimensions = alphabetDimensions.shift();
	if (!dimensions) {
		clearInterval(interval);
		return;
	}
	console.clear();
	printGivenAlphabet(dimensions);
};

console.clear();
const interval = setInterval(printAlphabets, 1000);

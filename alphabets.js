const { stdout } = process;
const alphabetDimensions = require("./dimensions");

const printAt = (str, x, y) => {
	stdout.cursorTo(x, y);
	stdout.write(str);
};

const printGivenAlphabet = (dimensions, interval) => {
	console.clear();
	if (!dimensions) {
		clearInterval(interval);
		return;
	}
	dimensions.forEach(position => {
		printAt("*", position[0], position[1]);
	});
};

const printAlphabets = function(alphabets) {
	let requiredDimensions = [];
	alphabets.forEach(alphabet => {
		const dimensions = alphabetDimensions[alphabet];
		requiredDimensions.push(dimensions);
	});
	const interval = setInterval(
		() => printGivenAlphabet(requiredDimensions.shift(), interval),
		1000
	);
};

const main = () => {
	const name = process.argv[2];
	const alphabets = name.toUpperCase().split("");

	printAlphabets(alphabets);
};
main();

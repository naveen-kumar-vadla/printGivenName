"use strict";

const { stdout } = process;

const alphabetDimensions = require("./dimensions");
const { shapes, colours } = require("./shapeAndColour");
const { hideCursor, onClose } = require("./screen");

const printAt = (str, x, y) => {
	stdout.cursorTo(x, y);
	stdout.write(str);
};

const printGivenAlphabet = (dimensions, interval, char) => {
	console.clear();
	if (!dimensions) {
		clearInterval(interval);
		onClose();
	}
	dimensions.forEach(position => {
		printAt(char, position[0], position[1] - 10);
	});
};

const printAlphabets = function(alphabets) {
	let requiredDimensions = [];
	alphabets.forEach(alphabet => {
		const dimensions = alphabetDimensions[alphabet];
		requiredDimensions.push(dimensions);
	});
	hideCursor();
	const interval = setInterval(() => {
		const character = shapes[Math.floor(Math.random() * shapes.length)];
		const color = colours[Math.floor(Math.random() * colours.length)];
		printGivenAlphabet(requiredDimensions.shift(), interval, color(character));
	}, 1000);
};

const main = () => {
	const name = process.argv[2];
	const alphabets = name.toUpperCase().split("");

	printAlphabets(alphabets);
};

main();

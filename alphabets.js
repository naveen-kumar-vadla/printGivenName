"use strict";

const { stdout } = process;
const chalk = require("chalk");

const alphabetDimensions = require("./dimensions");
const { shapes, colours } = require("./shapeAndColour");
const { hideCursor, onClose } = require("./screen");

class printAlphabets {
	constructor(name) {
		this.alphabets = name.toUpperCase().split("");
	}
	printGivenName() {
		let requiredDimensions = [];

		this.alphabets.forEach(alphabet => {
			const dimensions = alphabetDimensions[alphabet];
			requiredDimensions.push(dimensions);
		});

		hideCursor();

		const interval1 = setInterval(() => {
			const character = shapes[Math.floor(Math.random() * shapes.length)];
			const color = colours[Math.floor(Math.random() * colours.length)];

			this.printGivenAlphabet(
				requiredDimensions.shift(),
				interval1,
				color(character)
			);
		}, 1000);
	}

	printGivenAlphabet(dimensions, interval1, char) {
		console.clear();
		if (!dimensions) {
			clearInterval(interval1);

			onClose();
		}
		dimensions.forEach(position => {
			this.printAt(char, position[0], position[1] - 10);
		});
	}

	printAt(str, x, y) {
		stdout.cursorTo(x, y);
		stdout.write(str);
	}
}

const main = () => {
	const name = process.argv[2];
	console.clear();
	const print = new printAlphabets(name);
	print.printGivenName();
};

main();

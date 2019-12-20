"use strict";

const { stdout } = process;

const alphabetDimensions = require("./dimensions");
const { shapes, colours } = require("./shapeAndColour");
const { hideCursor, onClose } = require("./screen");

class printName {
	constructor(name) {
		this.alphabets = name
			.join("")
			.toUpperCase()
			.split("");
		this.requiredDimensions = [];
	}

	getDimensions() {
		this.alphabets.map(alphabet => {
			const dimensions = alphabetDimensions[alphabet];
			this.requiredDimensions.push(dimensions);
		});
	}

	printGivenName() {
		hideCursor();

		const interval1 = setInterval(() => {
			const character = shapes[Math.floor(Math.random() * shapes.length)];
			const color = colours[Math.floor(Math.random() * colours.length)];

			this.printGivenAlphabet(
				this.requiredDimensions.shift(),
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
	const name = new printName(process.argv.slice(2));
	console.clear();
	name.getDimensions();
	name.printGivenName();
};

main();

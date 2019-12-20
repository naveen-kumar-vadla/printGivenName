"use strict";

const { stdout } = process;

const alphabetDimensions = require("./dimensions");
const { shapes, colours, alphabetsPosition } = require("./shapeAndColour");
const { hideCursor, onClose } = require("./screen");

class printName {
	constructor(name) {
		this.alphabets = name
			.join(" ")
			.toUpperCase()
			.split("");
		this.requiredDimensions = [];
		this.screenPositions = [];
	}

	getDimensions() {
		this.alphabets.map(alphabet => {
			const dimensions = alphabetDimensions[alphabet];
			this.requiredDimensions.push(dimensions);
		});
	}

	printGivenName() {
		hideCursor();
		let i = 0;
		setInterval(() => {
			const symbol = shapes[Math.floor(Math.random() * shapes.length)];
			const color = colours[Math.floor(Math.random() * colours.length)];
			const char = this.alphabets[i] == " " ? " " : symbol;
			if (this.screenPositions.length == 0) {
				console.clear();
				this.screenPositions = alphabetsPosition.slice();
			}
			this.printGivenAlphabet(
				this.requiredDimensions.shift(),
				this.screenPositions.shift(),
				color(char)
			);
			i++;
		}, 500);
	}

	printGivenAlphabet(dimensions, screenPositions, char) {
		if (!dimensions) {
			onClose();
		}
		dimensions.forEach(position => {
			this.printAt(
				char,
				screenPositions[0] + position[0],
				screenPositions[1] + position[1]
			);
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

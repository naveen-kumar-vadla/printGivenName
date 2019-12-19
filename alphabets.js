const { stdout } = process;
const { wPositions } = require("./dimensions");

const printAt = (str, x, y) => {
	stdout.cursorTo(x, y);
	stdout.write(str);
};

const printAlphabets = () => {
	if (wPositions.length == 0) return;
	let position = wPositions.shift();
	printAt("*", position[0], position[1] - 10);
	printAlphabets();
};

console.clear();
printAlphabets();

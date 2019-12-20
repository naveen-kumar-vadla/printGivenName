const { stdout } = process;

const showCursor = () => {
  stdout.cursorTo(0, 0);
  stdout.clearScreenDown();
  stdout.write("\x1B[?25h");
};

const hideCursor = () => {
  stdout.write("\x1B[?25l");
};

const onClose = function() {
  showCursor();
  process.exit(0);
};

module.exports = { showCursor, hideCursor, onClose };

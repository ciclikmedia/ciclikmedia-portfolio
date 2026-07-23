let cursorPosition = {
  x: 0,
  y: 0,
};

export function setCursorPosition(
  x: number,
  y: number
) {
  cursorPosition = { x, y };
}

export function getCursorPosition() {
  return cursorPosition;
}
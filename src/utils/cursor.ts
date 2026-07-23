export function showDefaultCursorPosition(
  x = window.innerWidth / 2,
  y = window.innerHeight * 0.86
) {
  window.dispatchEvent(
    new CustomEvent("cursor:show", {
      detail: {
        x,
        y,
      },
    })
  );
}
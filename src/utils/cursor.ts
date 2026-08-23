export function showDefaultCursorPosition(

  x = window.innerWidth / 2,

  y = window.innerHeight * 0.86

) {

  // About controla el cursor cuando termina
  // la animación de su Hero.
  if (window.location.pathname === "/about") {
    return;
  }

  window.dispatchEvent(

    new CustomEvent("cursor:show", {

      detail: {

        x,

        y,

      },

    })

  );

}
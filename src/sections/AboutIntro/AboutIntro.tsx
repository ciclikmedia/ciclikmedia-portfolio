'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "@/lib/gsap";

import Container from "@/components/layout/Container/Container";

import styles from "./AboutIntro.module.scss";

import { getCursorPosition } from "@/utils/cursorPosition";

const disciplines = [
  "Creative Development",
  "Frontend Engineering",
  "UX/UI Design",
  "Creative Motion",
  "Interactive Experiences",
];

export default function AboutIntro() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const disciplineRefs =
    useRef<(HTMLDivElement | null)[]>([]);

  const profileRef =
    useRef<HTMLDivElement>(null);

    const profileTextRef =
    useRef<HTMLDivElement>(null);

    const bioRef =
    useRef<HTMLDivElement>(null);

    const photoRef =
    useRef<HTMLDivElement>(null);

  /*
   * CURSOR
   */

  useEffect(() => {
    const { x, y } = getCursorPosition();

    window.dispatchEvent(
      new CustomEvent("cursor:show", {
        detail: {
          x:
            x ||
            window.innerWidth / 2,

          y:
            y ||
            window.innerHeight / 2,
        },
      })
    );
  }, []);

  /*
   * INTRO
   */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const disciplinesElements =
        disciplineRefs.current.filter(
          Boolean
        ) as HTMLDivElement[];

      const profile =
        profileRef.current;

        const profileText =
        profileTextRef.current;

        const bio =
        bioRef.current;

        const photo =
        photoRef.current;

      if (
        disciplinesElements.length !==
            disciplines.length ||
        !profile ||
        !profileText ||
        !bio ||
        !photo
        ) {
        return;
        }

      /*
       * ======================================================
       * DAVID
       * ======================================================
       *
       * David aparece primero.
       */

      gsap.set(profile, {
        opacity: 0,
        y: 25,
      });

      gsap.set(bio, {
        opacity: 0,
        y: 15,
      });

      gsap.set(photo, {
        opacity: 0,
        y: 20,
        scale: 0.98,
      });

      /*
       * ======================================================
       * DISCIPLINES
       * ======================================================
       *
       * Cada palabra tiene una altura distinta.
       */

      const configurations = [
  {
    x: -120,
    rotate: -3,
    scale: 0.92,
    enterDuration: 1.4,
    exitDuration: 2.2,
    exitX: 120,
    delay: 0.3,
  },

  {
    x: 120,
    rotate: 2,
    scale: 1,
    enterDuration: 1.6,
    exitDuration: 2.4,
    exitX: -120,
    delay: 2.2,
  },

  {
    x: -130,
    rotate: -1.5,
    scale: 0.88,
    enterDuration: 1.5,
    exitDuration: 2.1,
    exitX: 125,
    delay: 4.1,
  },

  {
    x: 130,
    rotate: 2.5,
    scale: 1.04,
    enterDuration: 1.7,
    exitDuration: 2.5,
    exitX: -125,
    delay: 6.0,
  },

  {
    x: -115,
    rotate: -2,
    scale: 0.95,
    enterDuration: 1.55,
    exitDuration: 2.3,
    exitX: 130,
    delay: 7.9,
  },
];

      /*
       * Estado inicial de las palabras.
       */

   disciplinesElements.forEach(
  (element, index) => {
    const config =
      configurations[index];

    gsap.set(element, {
      opacity: 0,

      xPercent:
        config.x,

      rotate:
        config.rotate,

      scale:
        config.scale,
    });
  }
);

      /*
 * ======================================================
 * PROFILE INTRO
 * ======================================================
 *
 * David, bio y foto aparecen una sola vez.
 */

const profileIntro = gsap.timeline({
  paused: true,
});

profileIntro.to(
  profile,
  {
    opacity: 1,
    y: 0,
    duration: 0.65,
    ease: "power3.out",
  }
);

profileIntro.to(
  bio,
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power3.out",
  },
  "-=0.4"
);

profileIntro.to(
  photo,
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    ease: "power3.out",
  },
  "-=0.45"
);


/*
 * ======================================================
 * DISCIPLINES — INFINITE LOOP
 * ======================================================
 *
 * Cada palabra tiene su propio movimiento.
 * No dependen de una secuencia común.
 */

/*
 * ======================================================
 * DISCIPLINES — CONTROLLED INFINITE LOOP
 * ======================================================
 *
 * Un único timeline controla el ritmo.
 *
 * La frase, altura y dirección cambian
 * de manera aleatoria en cada aparición,
 * pero las apariciones están sincronizadas.
 */

const disciplinesLoop = gsap.timeline({
  paused: true,
  repeat: -1,
});


const getSafeTop = () => {
  const profileRect =
    profileText.getBoundingClientRect();

  const stageRect =
    sectionRef.current!.getBoundingClientRect();

  const profileTop =
    profileRect.top -
    stageRect.top;

  const profileBottom =
    profileRect.bottom -
    stageRect.top;

  const stageHeight =
    stageRect.height;

  /*
   * Altura aproximada de la frase.
   */

  const elementHeight =
    80;

  /*
   * Espacio reservado al header.
   */

  const headerHeight =
    100;

  /*
   * Separación de seguridad.
   */

  const padding =
    30;


  /*
   * ======================================================
   * ZONA SUPERIOR
   * ======================================================
   *
   * Nunca entra en la zona del header.
   */

  const upperMin =
    headerHeight +
    padding;

  const upperMax =
    profileTop -
    elementHeight -
    padding;


  /*
   * ======================================================
   * ZONA INFERIOR
   * ======================================================
   *
   * Nunca puede superar el final
   * del stage.
   */

  const lowerMin =
    profileBottom +
    padding;

  const lowerMax =
    stageHeight -
    elementHeight -
    padding;


  /*
   * ======================================================
   * ELEGIR ARRIBA / ABAJO
   * ======================================================
   */

  const useUpper =
    Math.random() < 0.5;


  let min: number;
  let max: number;


  /*
   * ARRIBA
   */

  if (
    useUpper &&
    upperMax > upperMin
  ) {
    min =
      upperMin;

    max =
      upperMax;

  }


  /*
   * ABAJO
   */

  else if (
    !useUpper &&
    lowerMax > lowerMin
  ) {
    min =
      lowerMin;

    max =
      lowerMax;

  }


  /*
   * Si la zona elegida no tiene
   * suficiente espacio, utilizamos
   * la otra.
   */

  else if (
    upperMax > upperMin
  ) {
    min =
      upperMin;

    max =
      upperMax;

  }


  else {
    min =
      lowerMin;

    max =
      lowerMax;
  }


  /*
   * ======================================================
   * SEPARACIÓN DE LA FRASE ANTERIOR
   * ======================================================
   */

  let top =
    gsap.utils.random(
      min,
      max
    );


  const minimumDistance =
    140;


  let attempts =
    0;


  while (
    Math.abs(
      top -
      previousTop
    ) <
      minimumDistance &&
    attempts <
      10
  ) {

    top =
      gsap.utils.random(
        min,
        max
      );

    attempts++;
  }


  previousTop =
    top;


  return top;
};

let previousIndex = -1;

let previousTop = -9999;


/*
 * ------------------------------------------------------
 * Elegir una frase diferente a la anterior
 * ------------------------------------------------------
 */

const getNextIndex = () => {
  let index;

  do {
    index = Math.floor(
      Math.random() *
        disciplinesElements.length
    );
  } while (
    index === previousIndex
  );

  previousIndex = index;

  return index;
};


/*
 * ------------------------------------------------------
 * Añadir una aparición
 * ------------------------------------------------------
 */

const addDiscipline = () => {

  const index =
    getNextIndex();

  const element =
    disciplinesElements[index];


  /*
   * ALTURA ALEATORIA
   *
   * Nunca será exactamente igual
   * a la aparición anterior.
   */

  const top =
  getSafeTop();


  /*
   * DIRECCIÓN ALEATORIA
   */

  const direction =
    Math.random() > 0.5
      ? 1
      : -1;


  const enterX =
    direction === 1
      ? -120
      : 120;


  const exitX =
    direction === 1
      ? 120
      : -120;


  /*
   * POSICIÓN INICIAL
   */

 gsap.set(element, {

  top:
    `${top}px`,

  opacity: 0,

    color:
      "#F2F2F2",

    xPercent:
      enterX,

    rotate:
        gsap.utils.random(
            -5,
            5
        ),

    scale:
        gsap.utils.random(
            0.82,
            1.08
        ),
  });


  /*
   * ======================================================
   * ENTRADA
   * ======================================================
   */

  disciplinesLoop.to(
    element,
    {

      opacity:
        0.28,

      xPercent:
        0,

      rotate:
        0,

      scale:
        1,

      duration:
        gsap.utils.random(0.7, 1.1),

      ease:
        "power3.out",
    }
  );


  /*
   * ======================================================
   * ROSA
   * ======================================================
   */

  disciplinesLoop.to(
    element,
    {

      color:
        "#FF57DB",

      opacity:
        0.72,

      duration:
        gsap.utils.random(0.18, 0.3),

      ease:
        "power2.out",

    },
    "-=0.15"
  );


  /*
   * ======================================================
   * PRESENCIA
   * ======================================================
   */

  disciplinesLoop.to(
    element,
    {

      opacity:
        0.62,

      duration:
        0.65,

      ease:
        "none",
    }
  );


  /*
   * ======================================================
   * SALIDA
   * ======================================================
   */

  disciplinesLoop.to(
    element,
    {

      opacity:
        0,

      xPercent:
        exitX,

      rotate:
        gsap.utils.random(
          -2,
          2
        ),

      duration:
        gsap.utils.random(0.8, 1.25),

      ease:
        "power3.inOut",
    }
  );


  /*
   * ======================================================
   * RESPIRACIÓN
   * ======================================================
   */

 disciplinesLoop.to(
  {},
  {
    duration:
      gsap.utils.random(0.15, 0.45),
  }
);
};


/*
 * ======================================================
 * CONSTRUIR EL CICLO
 * ======================================================
 *
 * Cinco apariciones diferentes.
 */

for (
  let i = 0;
  i < 5;
  i++
) {
  addDiscipline();
}


/*
 * ======================================================
 * HEADER → START
 * ======================================================
 */

const startIntro = () => {
  profileIntro.play();

  disciplinesLoop.play();
};

window.addEventListener(
  "header:intro-ready",
  startIntro
);

return () => {

  window.removeEventListener(
    "header:intro-ready",
    startIntro
  );

  profileIntro.kill();

  disciplinesLoop.kill();
};

     
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.intro}
    >
      <Container>

        <div className={styles.stage}>

          {/* ==================================================
              DISCIPLINES
              ================================================== */}

          <div
            className={
              styles.disciplines
            }
          >
            {disciplines.map(
              (
                discipline,
                index
              ) => (
                <div
                  key={discipline}
                  ref={(element) => {
                    disciplineRefs.current[
                      index
                    ] = element;
                  }}
                  className={
                    styles.discipline
                  }
                >
                  {discipline}
                </div>
              )
            )}
          </div>

          {/* ==================================================
              PROFILE
              ================================================== */}

          <div
            className={styles.profile}
          >

            <div
            ref={profileTextRef}
            className={
                styles.profileText
            }
            >

              <div
                ref={profileRef}
                className={
                  styles.name
                }
              >
                I'M <br></br>DAVID MURILLO.
              </div>

              <div
                ref={bioRef}
                className={
                  styles.bio
                }
              >
                Frontend developer and
                creative developer focused
                on interaction, motion and
                digital experiences.
              </div>

            </div>

            <div
              ref={photoRef}
              className={
                styles.photo
              }
            >
              <img
                src="/images/about/IMG_6535_Original.PNG"
                alt="David Murillo"
                draggable={false}
              />
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}
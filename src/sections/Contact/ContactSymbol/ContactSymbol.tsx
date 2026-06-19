'use client';

import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './ContactSymbol.module.scss';

export default function ContactSymbol() {
  const svgRef =
    useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    gsap.registerPlugin(
      ScrollTrigger
    );

    const strokes =
      svgRef.current.querySelectorAll(
        '[data-stroke]'
      );

    const fills =
      svgRef.current.querySelectorAll(
        '[data-fill]'
      );

    strokes.forEach((path) => {
      const length =
        (path as SVGPathElement)
          .getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    gsap.set(fills, {
      opacity: 0,
    });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.5,
      paused: true,
    });

    tl.to(strokes, {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.15,
      ease: 'power2.out',
    })

      .to(
        fills,
        {
          opacity: 1,
          duration: 0.5,
        },
        '-=0.3'
      )

      .to(
        strokes,
        {
          opacity: 0,
          duration: 0.4,
        },
        '<'
      )

      .to({}, { duration: 1 })

      .set(strokes, {
        opacity: 1,
      })

      .set(fills, {
        opacity: 0,
      })

      .set(strokes, {
        strokeDashoffset: (
          i,
          target
        ) =>
          (
            target as SVGPathElement
          ).getTotalLength(),
      });

    ScrollTrigger.create({
      trigger: '#contact-section',

      start: 'top 70%',

      onEnter: () =>
        tl.play(),

      onLeave: () =>
        tl.pause(),

      onEnterBack: () =>
        tl.play(),

      onLeaveBack: () =>
        tl.pause(),
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <svg
        ref={svgRef}
        className={styles.symbol}
        viewBox="0 0 32 33"
      >
        {/* STROKES */}

        <path
          data-stroke
          className={styles.strokePath}
          d="M3.24624947,7.68429803 C8.94160947,-0.425149965 20.1546995,-2.45549197 28.2968995,3.22625803 L26.5283995,5.76533803 C19.7753995,1.06671803 10.4832995,2.72820803 5.76771947,9.46164803 C1.04914947,16.189298 2.71745947,25.454898 9.47277947,30.156098 L7.71790947,32.650298 L7.33899947,32.380798 C-0.386313529,26.730298 -2.30531053,16.016198 2.98452947,8.06612803 L3.24624947,7.68429803 Z"
        />

        <path
          data-stroke
          className={styles.strokePath}
          d="M20.7566995,11.427298 C24.5238995,12.772498 26.5179995,16.978898 25.1375995,20.760298 C23.7906995,24.523898 19.5801995,26.515898 15.7811995,25.138298 L16.6395995,22.756398 C19.1163995,23.687998 21.8785995,22.386898 22.7596995,19.906798 C23.6868995,17.439998 22.3836995,14.677798 19.8973995,13.809198 L20.7566995,11.427298 Z"
        />

        <path
          data-stroke
          className={styles.strokePath}
          d="M7.61855947,11.370898 C11.3806995,5.41654803 19.2020995,3.65003803 25.1194995,7.43336803 L25.3939995,7.61304803 C31.0935995,11.461298 32.7389995,19.171398 29.0413995,25.030998 L26.4925995,23.406998 C29.3637995,18.875298 28.0194995,12.880598 23.5071995,9.98902803 C18.9979995,7.10176803 13.0346995,8.45915803 10.1634995,12.988998 L7.61855947,11.370898 Z"
        />

        {/* FILLS */}

        <path
          data-fill
          className={styles.fillPath}
          d="M3.24624947,7.68429803 C8.94160947,-0.425149965 20.1546995,-2.45549197 28.2968995,3.22625803 L26.5283995,5.76533803 C19.7753995,1.06671803 10.4832995,2.72820803 5.76771947,9.46164803 C1.04914947,16.189298 2.71745947,25.454898 9.47277947,30.156098 L7.71790947,32.650298 L7.33899947,32.380798 C-0.386313529,26.730298 -2.30531053,16.016198 2.98452947,8.06612803 L3.24624947,7.68429803 Z"
        />

        <path
          data-fill
          className={styles.fillPath}
          d="M20.7566995,11.427298 C24.5238995,12.772498 26.5179995,16.978898 25.1375995,20.760298 C23.7906995,24.523898 19.5801995,26.515898 15.7811995,25.138298 L16.6395995,22.756398 C19.1163995,23.687998 21.8785995,22.386898 22.7596995,19.906798 C23.6868995,17.439998 22.3836995,14.677798 19.8973995,13.809198 L20.7566995,11.427298 Z"
        />

        <path
          data-fill
          className={styles.fillPath}
          d="M7.61855947,11.370898 C11.3806995,5.41654803 19.2020995,3.65003803 25.1194995,7.43336803 L25.3939995,7.61304803 C31.0935995,11.461298 32.7389995,19.171398 29.0413995,25.030998 L26.4925995,23.406998 C29.3637995,18.875298 28.0194995,12.880598 23.5071995,9.98902803 C18.9979995,7.10176803 13.0346995,8.45915803 10.1634995,12.988998 L7.61855947,11.370898 Z"
        />
      </svg>
    </div>
  );
}
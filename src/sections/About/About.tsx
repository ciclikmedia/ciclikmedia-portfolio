'use client';

import { useRef, useLayoutEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./About.module.scss";

import { useCursor } from "@/hooks/useCursor";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { setVariant } =
    useCursor();

  const sectionRef = useRef<HTMLElement>(null);

  const pinContainerRef =
    useRef<HTMLDivElement>(null);

  const contentRef =
    useRef<HTMLDivElement>(null);

  const reelRef =
    useRef<HTMLDivElement>(null);

  const videoRef =
    useRef<HTMLVideoElement>(null);

      useLayoutEffect(() => {
      if (
        !videoRef.current ||
        !sectionRef.current
      ) {
        return;
      }

      const video = videoRef.current;

      const pinContainer = pinContainerRef.current;
      const reel = reelRef.current;

      if (!pinContainer || !reel) return;

      // Estado inicial
      gsap.set(video, {
        opacity: 0,
        scale: 1.03,
      });

      video.pause();
      video.currentTime = 0;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,

        start: "top 65%",

        end: "bottom 35%",

        onEnter: () => {
          video.pause();
          video.currentTime = 0;

          gsap.killTweensOf(video);

          gsap.fromTo(
            video,
            {
              opacity: 0,
              scale: 1.03,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
            }
          );

          video.play();
        },

        onEnterBack: () => {
          video.pause();
          video.currentTime = 0;

          gsap.killTweensOf(video);

          gsap.fromTo(
            video,
            {
              opacity: 0,
              scale: 1.03,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
            }
          );

          video.play();
        },

        onLeave: () => {
          gsap.to(video, {
            opacity: 0.45,
            duration: 0.35,
            ease: "power2.out",
          });

          video.pause();
        },

        onLeaveBack: () => {
          gsap.to(video, {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
          });

          video.pause();
        },
      });

      const content = contentRef.current!;

      const getTravel = () =>
        Math.max(
          0,
          video.offsetHeight - content.offsetHeight
        );

      const getExit = () =>
        content.offsetHeight;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainer,

            start: "top-=80 top",

            end: () => `+=${getTravel() + getExit()}`,

            pin: true,

            scrub: true,
            pinSpacing: false,

            anticipatePin: -1,

            invalidateOnRefresh: true,
          },
        });
        


        const onResize = () => {
          ScrollTrigger.refresh();
        };


        tl

        .to(reel, {
          y: () => -getTravel(),
          ease: "none",
        })

        .to(
          [content, reel],
          {
            y: () => `-=${getExit()}`,
            ease: "none",
          }
        );
        ScrollTrigger.refresh();
      return () => {
        window.removeEventListener("resize", onResize);
        trigger.kill();

        tl.kill();
      };
    }, []);
    
    

  return (
    <section className={styles.about} ref={sectionRef}>

            <div
              ref={pinContainerRef}
              className={styles.pin}
            >

              <div className="site-container">

                <div className={styles.grid}>

                  <div
                    ref={contentRef}
                    className={styles.content}
                  >

                 {/*} <span className={styles.eyebrow}>
                    ABOUT
                  </span>*/}

                  <h2>
                    DESIGNING
                    <br />
                    DEVELOPING              
                    <br />
                    ANIMATING
                    <br />
                    DIGITAL
                    <br />
                    PRODUCTS.
                  </h2>

                  {/*<p>
                    I design and build digital products with a strong focus on interaction, motion and performance. Every project is crafted to feel intuitive, refined and memorable
                  </p>*/}

                  <a
                    href="/about"
                    className={styles.link}
                    onMouseEnter={() => {
                      setVariant("link");
                    }}
                    onMouseLeave={() => {
                      setVariant("default");
                    }}
                  >
                    <span>
                      MORE ABOUT ME&nbsp;&nbsp;&nbsp;&nbsp;→
                    </span>

                    <span className={styles.linkAccent}>
                      MORE ABOUT ME&nbsp;&nbsp;&nbsp;&nbsp;→
                    </span>
                  </a>

                </div>

               <div className={styles.viewport}>

                  <div
                    ref={reelRef}
                    className={styles.track}
                  >

                    <video
                      ref={videoRef}
                      className={styles.video}
                      muted
                      playsInline
                      preload="auto"
                      loop
                    >
                      <source
                        src="/videos/videoAboutFake.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
                </div>

            </div>
          </div>
        
    </section>
  );
}
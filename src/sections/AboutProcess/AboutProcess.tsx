"use client";

import { useState } from "react";

import Container from "@/components/layout/Container/Container";

import styles from "./AboutProcess.module.scss";

const steps = [
  {
    number: "01",
    title: "Think",
    text: "Start with the problem. Ask questions. Understand what actually needs solving.",
    detail:
      "I start by understanding the bigger picture before getting too attached to a solution. I look at the context, the objectives, the people using it and the constraints around it. Sometimes the most useful thing is simply asking why something works the way it does — and whether it really needs to.",
  },
  {
    number: "02",
    title: "Explore",
    text: "Try things. Follow the interesting directions. Kill the bad ones.",
    detail:
      "Once there is a direction, I like to explore it from different angles. I test ideas, compare approaches and see where they lead. Some work, some don't, and some lead somewhere completely unexpected. The important part is to keep moving until the idea starts becoming something worth making.",
  },
  {
    number: "03",
    title: "Make",
    text: "Turn ideas into something real. Design it. Build it. See how it behaves.",
    detail:
      "This is where things leave the screen of the imagination and become real. I move between design and development, building the experience and seeing how all the pieces actually behave together. It is also where the little details start revealing whether an idea really works or only looked good on paper.",
  },
  {
    number: "04",
    title: "Refine",
    text: "Break it. Fix it. Remove what doesn't work. Keep what does.",
    detail:
      "The first version is rarely the interesting one. I test, adjust, simplify and keep looking for the things that feel slightly off. Sometimes that means changing a detail, sometimes removing half of what was there. And yes, occasionally I break something along the way — usually with the intention of making it work better afterwards.",
  },
];

export default function AboutProcess() {
  const [activeStep, setActiveStep] = useState(0);

  const active = steps[activeStep];

  return (
    <section className={styles.section}>
      <Container>

        {/* HEADER */}

        <div className={styles.header}>
          <span className={styles.eyebrow}>
            05 — Process
          </span>
        </div>


        {/* PROCESS */}

        <div className={styles.process}>

          {/* INTRO */}

          <div className={styles.intro}>
            <h2>
              HOW I
              <br />
              WORK
            </h2>
          </div>


          {/* INTERACTIVE AREA */}

          <div className={styles.interactive}>

            {/* STEPS */}

            <div className={styles.steps}>

              {steps.map((step, index) => {
                const isActive = index === activeStep;

                return (
                  <button
                    key={step.number}
                    type="button"
                    className={`${styles.step} ${
                      isActive ? styles.active : ""
                    }`}
                    data-cursor={
                      step.title === "Think"
                        ? "processThink"
                        : step.title === "Explore"
                        ? "processExplore"
                        : step.title === "Make"
                        ? "processMake"
                        : "processRefine"
                    }
                    onMouseEnter={() => setActiveStep(index)}
                    onFocus={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                    aria-pressed={isActive}
                  >

                    <span className={styles.number}>
                      {step.number}
                    </span>

                    <div className={styles.stepContent}>
                      <h3>
                        {step.title}
                      </h3>

                      <p>
                        {step.text}
                      </p>
                    </div>

                  </button>
                );
              })}

            </div>


            {/* ACTIVE DISPLAY */}

            <div className={styles.display}>

              <span className={styles.displayNumber}>
                {active.number}
              </span>

              <h3 key={active.number}>
                {active.title}
              </h3>

              <p key={`${active.number}-text`}>
                {active.detail}
              </p>

            </div>

          </div>

        </div>


        {/* CLOSING */}

        <div className={styles.closing}>
          <p>
            Figure it out.
            <br />
            Make it real.
            <br />
            Make it better.
          </p>
        </div>

      </Container>
    </section>
  );
}
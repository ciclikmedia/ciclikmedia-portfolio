
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cliniem-inter",
});

import ProjectSection from "@/components/project/ProjectSection/ProjectSection";
import ProjectOverview from "@/components/project/ProjectOverview/ProjectOverview";
import ProjectChapter from "@/components/project/ProjectChapter/ProjectChapter";
import ProjectText from "@/components/project/ProjectText/ProjectText";
import ProjectVideo from "@/components/project/ProjectVideo/ProjectVideo";

import styles from "./CliniemProject.module.scss";
import caseStudyStyles from "@/components/project/ProjectCaseStudy/ProjectCaseStudy.module.scss";

import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function CliniemProject({ project }: Props) {

  // Extract project modules
  const textModule = project.modules.find(
    (module) => module.type === "text"
  );

  const videoModule = project.modules.find(
    (module) => module.type === "video"
  );

  return (
    <>
      {/* =================================
          01 — OVERVIEW
      ================================= */}

      {project.modules.some((module) => module.type === "overview") && (
        <ProjectSection firstPadding>

          <ProjectChapter
            number="01"
            title="Overview"
          />

          <ProjectOverview
            overview={project.overview}
            client={project.client}
            year={project.year}
            role={project.role}
            services={project.services}
          />

        </ProjectSection>
      )}


      {/* =================================
          02 — REDESIGN
          All sections share light background
      ================================= */}

      <ProjectSection variant="light">

        <div className={styles.redesign}>

          {/* 02.1 — THE TRANSFORMATION */}

          <div className={styles.redesignGrid}>

            <div className={styles.redesignVideo}>

              {videoModule?.type === "video" && (
                <ProjectVideo
                  src={videoModule.src}
                  poster={videoModule.poster}
                />
              )}

            </div>

            <div className={styles.redesignText}>

              <ProjectChapter
                number="02"
                title="Redesign"
              />

              <ProjectText>
                <p>
                  {textModule?.type === "text" && textModule.text}
                </p>
              </ProjectText>

            </div>

          </div>


          {/* =================================
              02.2 — VISUAL DIRECTION
          ================================= */}

          <div className={caseStudyStyles.visualDirection}>

            <div className={caseStudyStyles.sectionIntro}>

              <span className={caseStudyStyles.eyebrow}>
                VISUAL DIRECTION
              </span>

              <h2>
                A refined
                <br />
                visual language.
              </h2>

              <p>
                A cohesive visual system built around typography,
                colour and imagery, creating a consistent and
                approachable digital experience.
              </p>

            </div>


            <div className={caseStudyStyles.visualPrinciples}>

              {/* 01 — TYPOGRAPHY */}

              <article className={caseStudyStyles.visualPrinciple}>

                <span className={caseStudyStyles.visualNumber}>
                  01 / TYPOGRAPHY
                </span>

                <h3>Typography &amp; Hierarchy</h3>

                <p>
                  Inter is used throughout the website, establishing
                  a clear hierarchy through font weights, sizes
                  and spacing.
                </p>

                <div className={`${caseStudyStyles.typographySample} ${inter.className}`}>

                  <span>INTER — SEMIBOLD</span>

                  <h4>Medicina estética</h4>

                  <span>INTER — REGULAR</span>

                  <p>
                    Tratamientos personalizados diseñados para
                    potenciar tu belleza con resultados naturales.
                  </p>

                  <span>INTER — MEDIUM</span>

                  <strong>Conocer tratamientos →</strong>

                </div>
                {/* Typography scale */}
                <div className={caseStudyStyles.typographyScale}>

                  <div className={caseStudyStyles.scaleHeader}>
                    <span>TYPE SYSTEM</span>
                    <span>INTER / RESPONSIVE SCALE</span>
                  </div>

                  <div className={caseStudyStyles.scaleRow}>
                    <span className={caseStudyStyles.scaleLabel}>H1 / DISPLAY</span>
                    <h5>Medicina estética</h5>
                    <span className={caseStudyStyles.scaleSize}>48 / 600</span>
                  </div>

                  <div className={caseStudyStyles.scaleRow}>
                    <span className={caseStudyStyles.scaleLabel}>H2 / SECTION</span>
                    <h6>Tratamientos</h6>
                    <span className={caseStudyStyles.scaleSize}>32 / 500</span>
                  </div>

                  <div className={caseStudyStyles.scaleRow}>
                    <span className={caseStudyStyles.scaleLabel}>BODY / REGULAR</span>
                    <p>Una experiencia diseñada alrededor de cada paciente.</p>
                    <span className={caseStudyStyles.scaleSize}>16 / 400</span>
                  </div>

                  <div className={caseStudyStyles.scaleRow}>
                    <span className={caseStudyStyles.scaleLabel}>CAPTION / LABEL</span>
                    <small>DESCUBRE NUESTROS TRATAMIENTOS</small>
                    <span className={caseStudyStyles.scaleSize}>12 / 500</span>
                  </div>

                </div>

              </article>
              


              {/* 02 — COLOUR & IMAGERY */}

                <article className={caseStudyStyles.visualPrinciple}>

                  <span className={caseStudyStyles.visualNumber}>
                    02 / COLOUR &amp; IMAGERY
                  </span>

                  <h3>Colour &amp; Imagery</h3>

                  <p>
                    A refined colour palette combining warm gold accents,
                    neutral whites and deep grey tones to create a
                    sophisticated and consistent visual identity.
                  </p>

                  {/* Colour palette */}
                  <div className={caseStudyStyles.colourPalette}>

                    <div className={caseStudyStyles.colourItem}>
                      <div className={caseStudyStyles.swatchGold} />
                      <span>GOLD</span>
                      <small>#C6A76E</small>
                    </div>

                    <div className={caseStudyStyles.colourItem}>
                      <div className={caseStudyStyles.swatchWhite} />
                      <span>WHITE</span>
                      <small>#FFFFFF</small>
                    </div>

                    <div className={caseStudyStyles.colourItem}>
                      <div className={caseStudyStyles.swatchGradient} />
                      <span>GRADIENT</span>
                      <small>#4A4A4A</small>
                    </div>

                    <div className={caseStudyStyles.colourItem}>
                      <div className={caseStudyStyles.swatchGrey} />
                      <span>DARK GREY</span>
                      <small>#424242</small>
                    </div>

                    <div className={caseStudyStyles.colourItem}>
                      <div className={caseStudyStyles.swatchCharcoal} />
                      <span>CHARCOAL</span>
                      <small>#2B2B2B</small>
                    </div>

                  </div>

                  {/* Photography direction */}
                  <div className={caseStudyStyles.imageryGallery}>

                    {/* Clinic & Spaces */}
                    <div className={caseStudyStyles.imageryMain}>
                      <img
                        src="/images/projects/cliniem/despacho.webp"
                        alt="Cliniem clinic reception and interior design"
                      />
                      <span>01 — CLINIC &amp; SPACES</span>
                    </div>

                    {/* Treatment Rooms */}
                    <div className={caseStudyStyles.imageryItem}>
                      <img
                        src="/images/projects/cliniem/tratamiento1.webp"
                        alt="Cliniem aesthetic treatment room"
                      />
                      <span>02 — TREATMENT ROOMS</span>
                    </div>

                    {/* People & Professionals */}
                    <div className={caseStudyStyles.imageryItem}>
                      <img
                        src="/images/projects/cliniem/equipo1.webp"
                        alt="Cliniem medical team"
                      />
                      <span>03 — PEOPLE &amp; PROFESSIONALS</span>
                    </div>

                  </div>

                </article>



              {/* 03 — INTERFACE */}

              <article className={caseStudyStyles.visualPrinciple}>

                <span className={caseStudyStyles.visualNumber}>
                  03 / INTERFACE DESIGN
                </span>

                <h3>Interface &amp; Components</h3>

                <p>
                  A consistent visual language across buttons, links and interactive
                  elements creates a clear and intuitive experience, guiding users
                  through the website with recognizable actions and subtle interactions.
                </p>

                {/* Navigation preview */}
                <div className={caseStudyStyles.interfacePreview}>
                  <img
                    src="/images/projects/cliniem/cliniem-navigation.webp"
                    alt="Cliniem website navigation and interface"
                  />
                </div>

                {/* Buttons and interactions */}
                <div className={styles.buttonsShowcase}>

                  <div className={styles.buttonsGrid}>

                    {/* Design system */}
                    <div className={`${styles.buttonItem} ${styles.interfaceNote}`}>

                      <span className={styles.buttonLabel}>
                        01 — DESIGN SYSTEM
                      </span>

                      <div className={styles.interfaceNoteContent}>

                        <span className={styles.interfaceNoteAccent}>
                          UI PRINCIPLES
                        </span>

                        <h5>Designed for interaction.</h5>

                        <p>
                          A cohesive interface system built around clarity,
                          consistency and intuitive interactions.
                        </p>

                        <div className={styles.interfacePrinciples}>
                          <span>01 / Consistency</span>
                          <span>02 / Visual hierarchy</span>
                          <span>03 / Interaction feedback</span>
                        </div>

                      </div>
                    </div>

                    {/* Primary button */}
                    <div className={styles.buttonItem}>
                      <span className={styles.buttonLabel}>02 — PRIMARY BUTTON</span>

                      <a href="#" className={styles.btnPrimary}>
                        Book an appointment
                        <span className={styles.arrow}>↗</span>
                      </a>
                    </div>

                    {/* Outline button */}
                    <div className={styles.buttonItem}>
                      <span className={styles.buttonLabel}>03 — OUTLINE BUTTON</span>

                      <a href="#" className={styles.btnOutline}>
                        Discover more
                        <span className={styles.arrow}>→</span>
                      </a>
                    </div>

                    {/* Submit button */}
                    <div className={styles.buttonItem}>
                      <span className={styles.buttonLabel}>04 — FORM BUTTON</span>

                      <button type="button" className={styles.btnSubmit}>
                        Send message
                        <span className={styles.arrow}>→</span>
                      </button>
                    </div>

                    {/* CTA */}
                    <div className={styles.buttonItem}>
                      <span className={styles.buttonLabel}>05 — CALL TO ACTION</span>

                      <a href="#" className={styles.btnCta}>
                        Get in touch
                      </a>
                    </div>

                    {/* Sticky CTA */}
                    <div className={`${styles.buttonItem} ${styles.darkSample}`}>
                      <span className={styles.buttonLabel}>06 — STICKY CTA</span>

                      <a href="#" className={styles.btnScroll}>
                        Book now
                      </a>
                    </div>

                    {/* Text link */}
                    <div className={styles.buttonItem}>
                      <span className={styles.buttonLabel}>07 — TEXT LINK</span>

                      <a href="#" className={styles.btnText}>
                        View all articles
                        <span className={styles.arrow}>↗</span>
                      </a>
                    </div>

                    {/* Tags and filters */}
                    <div className={styles.buttonItem}>
                      <span className={styles.buttonLabel}>08 — TAGS &amp; FILTERS</span>

                      <div className={styles.chips}>
                        <span className={styles.chip}>Aesthetic medicine</span>
                        <span className={styles.chip}>Treatments</span>
                      </div>
                    </div>
                    {/* Hover states and micro-interactions */}
              <div className={`${styles.buttonItem} ${styles.interactionSample}`}>

                <span className={styles.buttonLabel}>
                  09 — HOVER &amp; MICRO-INTERACTIONS
                </span>

                <div className={styles.interactionContent}>

                  <span className={styles.interactionAccent}>
                    INTERACTIVE FEEDBACK
                  </span>

                  <div className={styles.interactionExamples}>

                    <span className={styles.interactionLink}>
                      Explore more
                      <span className={styles.interactionArrow}>↗</span>
                    </span>

                    <span className={styles.interactionUnderline}>
                      Discover treatments
                    </span>

                  </div>

                  <p>
                    Subtle transitions, animated arrows and hover states
                    provide visual feedback and make interactions feel natural.
                  </p>

                </div>

              </div>

                  </div>
                </div>

              </article>

            </div>
            
{/* Contact form — Patient communication */}
<div className={caseStudyStyles.interfaceFormFeature}>

  <div className={caseStudyStyles.interfaceFormImage}>
    <img
      src="/images/projects/cliniem/cliniem-contact-form.webp"
      alt="Cliniem patient contact form and medical professional"
    />
  </div>

  <div className={caseStudyStyles.interfaceFormText}>

    <span className={caseStudyStyles.visualNumber}>
      10 / CONTACT FORM
    </span>

    <h4>Designed for patient communication.</h4>

    <p>
      A clear and accessible contact experience designed
      to simplify patient enquiries, combining intuitive
      input fields, privacy consent and a clear call to action.
    </p>

    <div className={caseStudyStyles.interfaceFormDetails}>
      <span>01 / Structured form fields</span>
      <span>02 / Privacy consent</span>
      <span>03 / Clear call to action</span>
    </div>

  </div>

</div>
          </div>


          {/* =================================
              02.3 — USER EXPERIENCE
          ================================= */}

          <div className={caseStudyStyles.experience}>

            <div className={caseStudyStyles.experienceHeader}>

              <span className={caseStudyStyles.eyebrow}>
                USER EXPERIENCE
              </span>

              <h2>
                Designed around
                <br />
                the patient.
              </h2>

              <p>
                The information architecture and navigation
                were restructured to make the clinic's services
                easier to explore, helping patients find relevant
                information through a clearer and more intuitive
                experience.
              </p>

            </div>

{/* Treatment discovery — 01 */}
<div className={caseStudyStyles.experienceShowcase}>

  <article className={caseStudyStyles.experienceStep}>
    <div className={caseStudyStyles.experienceStepImage}>
      <img
        src="/images/projects/cliniem/cliniem-treatment-discovery.webp"
        alt="Cliniem breast augmentation treatment landing page"
      />
    </div>

    <div className={caseStudyStyles.experienceStepText}>
      <span className={caseStudyStyles.visualNumber}>
        01 / TREATMENT DISCOVERY
      </span>

      <h3>From first impression to informed decision.</h3>

      <p>
        Treatment landing pages were structured to introduce
        each service clearly, combining focused messaging,
        relevant information and prominent calls to action.
        The objective was to help patients understand the
        treatment and take the next step with confidence.
      </p>

      <div className={caseStudyStyles.experienceStepDetails}>
        <span>01 / Clear treatment introduction</span>
        <span>02 / Relevant information</span>
        <span>03 / Visible calls to action</span>
      </div>
    </div>
  </article>

  {/* Structured content — 02 */}
  <article className={`${caseStudyStyles.experienceStep} ${caseStudyStyles.experienceStepReverse}`}>
    <div className={caseStudyStyles.experienceStepImage}>
      <img
        src="/images/projects/cliniem/cliniem-structured-content-4k.webp"
        alt="Cliniem treatment information, features and pricing"
      />
    </div>

    <div className={caseStudyStyles.experienceStepText}>
      <span className={caseStudyStyles.visualNumber}>
        02 / STRUCTURED CONTENT
      </span>

      <h3>Information designed to guide.</h3>

      <p>
        Complex treatment information was organized into
        clear and accessible content sections, presenting
        key features, pricing and relevant details in a
        logical hierarchy that makes information easier
        to understand and explore.
      </p>

      <div className={caseStudyStyles.experienceStepDetails}>
        <span>01 / Content hierarchy</span>
        <span>02 / Treatment features and pricing</span>
        <span>03 / Readability and clarity</span>
      </div>
    </div>
  </article>
            {/* Navigation — 03 */}
              <article
                className={`${caseStudyStyles.experienceStep}`}
              >
                <div className={caseStudyStyles.experienceStepImage}>
                  <img
                    src="/images/projects/cliniem/cliniem-navigation-menu-4k.webp"
                    alt="Cliniem expanded navigation menu showing clinic specialties and treatments"
                  />
                </div>

                <div className={caseStudyStyles.experienceStepText}>
                  <span className={caseStudyStyles.visualNumber}>
                    03 / NAVIGATION &amp; INFORMATION ARCHITECTURE
                  </span>

                  <h3>Explore with clarity.</h3>

                  <p>
                    The navigation was structured around the clinic's
                    specialties and treatment categories, creating a
                    clear hierarchy that helps patients explore services
                    and find relevant information more easily.
                  </p>

                  <div className={caseStudyStyles.experienceStepDetails}>
                    <span>01 / Organized specialties</span>
                    <span>02 / Clear category hierarchy</span>
                    <span>03 / Accessible treatment navigation</span>
                  </div>
                </div>
              </article>

              </div>


            {/* Patient reviews — Social proof */}
            <div className={caseStudyStyles.experienceFeature}>

              <div className={caseStudyStyles.reviewsImage}>
                <img
                  src="/images/projects/cliniem/cliniem-patient-reviews.webp"
                  alt="Cliniem patient reviews carousel with five-star testimonials"
                />
              </div>

              <div className={caseStudyStyles.reviewsText}>

                <span className={caseStudyStyles.visualNumber}>
                  04 / PATIENT EXPERIENCE / SOCIAL PROOF
                </span>

                <h3>Building trust through real experiences.</h3>

                <p>
                  Patient testimonials were integrated into the digital
                  experience to reinforce credibility, showcase patient
                  satisfaction and help visitors make more confident decisions.
                </p>

                <div className={caseStudyStyles.reviewsPrinciples}>
                  <span>01 / Trust &amp; credibility</span>
                  <span>02 / Patient satisfaction</span>
                  <span>03 / Social proof</span>
                </div>

              </div>

            </div>

            <div className={caseStudyStyles.experienceDetails}>

              <div>
                <h3>Information Architecture</h3>
                <p>
                  A clearer content structure and organization
                  of the clinic's services.
                </p>
              </div>

              <div>
                <h3>Navigation</h3>
                <p>
                  An intuitive navigation system designed
                  around the patient's needs.
                </p>
              </div>

              <div>
                <h3>Content Hierarchy</h3>
                <p>
                  Clearer information and a consistent
                  presentation of treatments.
                </p>
              </div>

            </div>

          </div>


          {/* =================================
              02.4 — RESPONSIVE EXPERIENCE
          ================================= */}

          <div className={caseStudyStyles.responsive}>

            <div className={caseStudyStyles.responsiveHeader}>

              <span className={caseStudyStyles.eyebrow}>
                RESPONSIVE EXPERIENCE
              </span>

              <h2>
                Seamless across
                <br />
                every screen.
              </h2>

              <p>
                The experience was adapted across desktop,
                tablet and mobile devices, maintaining visual
                consistency and usability throughout
                different screen sizes.
              </p>

            </div>

            <div className={caseStudyStyles.responsiveImage}>

              {project.gallery[2] && (
                <img src="/images/projects/cliniem/responsiveCliniem.webp"
                  alt="Cliniem responsive website experience"
                />
              )}

            </div>

            <div className={caseStudyStyles.experienceDetails}>

              <div>
                <h3>Desktop</h3>
                <p>
                 A complete desktop experience, designed around clear navigation,
      structured content and an immersive visual presentation.
                </p>
              </div>

              <div>
                <h3>Tablet</h3>
                <p>
                  A flexible layout that adapts content, spacing and interface
      elements to provide a seamless experience across screen sizes.
                </p>
              </div>

              <div>
                <h3>Mobile</h3>
                <p>
                  A streamlined mobile experience featuring intuitive navigation,
                </p>
              </div>

            </div>

          </div>

        </div>

      </ProjectSection>
      <ProjectSection variant="dark">
  <section className={caseStudyStyles.development}>

    <div className={caseStudyStyles.developmentHeader}>

      <div className={caseStudyStyles.developmentIntro}>
        <ProjectChapter number="03" title="Development" />

        <span className={caseStudyStyles.developmentEyebrow}>
          WORDPRESS / CUSTOM DEVELOPMENT
        </span>
      </div>

      <div className={caseStudyStyles.developmentHeading}>
        <h2>
          Built around
          <br />
          flexibility and control.
        </h2>

        <p>
          The website was developed on WordPress using a
          tailored architecture, custom content structures
          and dynamic functionality. The result is a flexible
          platform that allows the Cliniem team to manage
          and organize its digital content independently.
        </p>
      </div>

    </div>

    <div className={caseStudyStyles.developmentGrid}>

      <article className={caseStudyStyles.developmentCard}>
        <span className={caseStudyStyles.developmentNumber}>01 / PLATFORM</span>
        <h3>WordPress Architecture</h3>
        <p>
          WordPress was used as the foundation of the project,
          extending its standard capabilities through custom
          development and a structure tailored to Cliniem's needs.
        </p>
        <div className={caseStudyStyles.developmentTags}>
          <span>WordPress</span>
          <span>Custom Theme</span>
          <span>PHP</span>
        </div>
      </article>

      <article className={caseStudyStyles.developmentCard}>
        <span className={caseStudyStyles.developmentNumber}>02 / CONTENT MODEL</span>
        <h3>Custom Content Management</h3>
        <p>
          Advanced Custom Fields, custom post types and
          taxonomies were implemented to organize treatments,
          projects and clinic information through a structured
          and manageable content system.
        </p>
        <div className={caseStudyStyles.developmentTags}>
          <span>ACF</span>
          <span>Custom Post Types</span>
          <span>Taxonomies</span>
        </div>
      </article>

      <article className={caseStudyStyles.developmentCard}>
        <span className={caseStudyStyles.developmentNumber}>03 / DYNAMIC FUNCTIONALITY</span>
        <h3>Dynamic Content Filtering</h3>
        <p>
          Custom AJAX filters allow users to explore projects
          by business area, activity and country, updating
          displayed results without reloading the page.
        </p>
        <div className={caseStudyStyles.developmentTags}>
          <span>AJAX</span>
          <span>JavaScript</span>
          <span>WordPress</span>
        </div>
      </article>

      <article className={caseStudyStyles.developmentCard}>
        <span className={caseStudyStyles.developmentNumber}>04 / FRONTEND</span>
        <h3>Custom Frontend Development</h3>
        <p>
          The visual design was translated into a responsive
          interface through custom templates, reusable
          components and carefully structured frontend code.
        </p>
        <div className={caseStudyStyles.developmentTags}>
          <span>HTML</span>
          <span>SCSS</span>
          <span>JavaScript</span>
        </div>
      </article>

    </div>
  </section>
</ProjectSection>


{/* =================================
    04 — AUTOMATION & INTEGRATIONS
================================= */}

<ProjectSection variant="dark">

  <section className={caseStudyStyles.automationIntegrations}>

    {/* HEADER */}

    <div className={caseStudyStyles.automationHeader}>

      <div className={caseStudyStyles.automationIntro}>
        <ProjectChapter
          number="04"
          title="Automation & Integrations"
        />
      </div>

      <div className={caseStudyStyles.automationDescription}>
        <p>
          Connecting systems, automating workflows and
          developing custom tools to improve Cliniem's
          operational processes and patient communication.
        </p>

        <span>
          AI / CUSTOM SOFTWARE / PROCESS AUTOMATION
        </span>
      </div>

    </div>

    {/* AUTOMATION FEATURES */}

    <div className={caseStudyStyles.automationGrid}>

      {/* 01 — AI COMMUNICATION */}

      <article className={caseStudyStyles.automationCard}>

        <div className={caseStudyStyles.automationCardTop}>
          <span>01 / AI COMMUNICATION</span>
          <span>ARTIFICIAL INTELLIGENCE</span>
        </div>

        <div className={caseStudyStyles.automationCardContent}>

          <h3>AI-Powered Communication</h3>

          <p>
            Integration of AI-powered assistants into
            Cliniem's communication workflows through
            Respond.io and WhatsApp Business.

            The solution supports patient enquiries,
            information requests and campaign communication.
          </p>

        </div>

        <div className={caseStudyStyles.automationTags}>
          <span>OpenAI</span>
          <span>Respond.io</span>
          <span>WhatsApp Business</span>
        </div>

      </article>

      {/* 02 — CUSTOM SOFTWARE */}

      <article className={caseStudyStyles.automationCard}>

        <div className={caseStudyStyles.automationCardTop}>
          <span>02 / CUSTOM SOFTWARE</span>
          <span>DESKTOP APPLICATION</span>
        </div>

        <div className={caseStudyStyles.automationCardContent}>

          <h3>Custom CSV Converter</h3>

          <p>
            Development of a desktop application using
            Electron to transform ClinicCloud exports into
            Respond.io-compatible CSV files.

            The tool automates data cleaning, phone number
            normalization, field mapping and file formatting.
          </p>

        </div>

        <div className={caseStudyStyles.automationTags}>
          <span>Electron</span>
          <span>JavaScript</span>
          <span>Node.js</span>
        </div>

      </article>

      {/* 03 — APPOINTMENT AUTOMATION */}

      <article className={caseStudyStyles.automationCard}>

        <div className={caseStudyStyles.automationCardTop}>
          <span>03 / PROCESS AUTOMATION</span>
          <span>APPOINTMENT MANAGEMENT</span>
        </div>

        <div className={caseStudyStyles.automationCardContent}>

          <h3>WhatsApp Appointment Automation</h3>

          <p>
            Automation of appointment notifications through
            WhatsApp Business, connecting appointment data
            with Respond.io to streamline patient
            communication and appointment reminders.
          </p>

        </div>

        <div className={caseStudyStyles.automationTags}>
          <span>WhatsApp Business</span>
          <span>Respond.io</span>
          <span>Automation</span>
        </div>

        

      </article>
      {/* 04 — SYSTEM INTEGRATION */}

<article className={caseStudyStyles.automationCard}>

  <div className={caseStudyStyles.automationCardTop}>
    <span>04 / SYSTEM INTEGRATION</span>
    <span>DATA INTEGRATION</span>
  </div>

  <div className={caseStudyStyles.automationCardContent}>
    <h3>ClinicCloud & Respond.io</h3>

    <p>
      Integration of clinic management data with
      Respond.io, adapting patient information and
      communication workflows to support more
      efficient data exchange between platforms.
    </p>
  </div>

  <div className={caseStudyStyles.automationTags}>
    <span>ClinicCloud</span>
    <span>Respond.io</span>
    <span>Data Integration</span>
  </div>

</article>

    </div>

  </section>

</ProjectSection>


{/* =================================
    05 — RESULTS & IMPACT
================================= */}

<ProjectSection variant="light">

  <section className={caseStudyStyles.resultsImpact}>

    {/* HEADER */}

    <div className={caseStudyStyles.resultsHeader}>

      <div className={caseStudyStyles.resultsIntro}>
        <ProjectChapter
          number="05"
          title="Results & Impact"
        />
      </div>

      <div className={caseStudyStyles.resultsDescription}>
        <h2>
          Designed to connect.
          <br />
          Built to evolve.
        </h2>

        <p>
          A renewed digital experience supported by a
          flexible content architecture, custom tools
          and integrated communication workflows.
          Bringing design, technology and operational
          efficiency together.
        </p>
      </div>

    </div>

    {/* MAIN VISUAL */}

    

    {/* RESULTS */}

    <div className={caseStudyStyles.resultsGrid}>

      <article className={caseStudyStyles.resultsItem}>
        <span>01 / DIGITAL EXPERIENCE</span>

        <h3>A more coherent digital presence</h3>

        <p>
          A renewed visual identity and a responsive
          experience designed to make information
          clearer and navigation more intuitive.
        </p>
      </article>

      <article className={caseStudyStyles.resultsItem}>
        <span>02 / CONTENT MANAGEMENT</span>

        <h3>Greater flexibility and control</h3>

        <p>
          A customised WordPress architecture that
          gives the team greater flexibility to manage,
          organise and update website content.
        </p>
      </article>

      <article className={caseStudyStyles.resultsItem}>
        <span>03 / OPERATIONAL EFFICIENCY</span>

        <h3>Smarter workflows</h3>

        <p>
          Custom tools and integrations designed to
          streamline data handling, appointment
          communication and patient interactions.
        </p>
      </article>

    </div>

    

  </section>

</ProjectSection>



    </>
  );
}

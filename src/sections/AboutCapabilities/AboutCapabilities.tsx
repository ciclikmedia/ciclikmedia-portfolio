import Container from "@/components/layout/Container/Container";

import styles from "./AboutCapabilities.module.scss";

export default function AboutCapabilities() {
  return (
    <section className={styles.section}>
      <Container>

        <div className={styles.header}>
          <span className={styles.eyebrow}>
            04 — Capabilities
          </span>
        </div>

        <div className={styles.capabilities}>

          {/* TITLE */}

          <div className={styles.title}>
            <h2>
              WHAT I
              <br />
              CAN DO
            </h2>
          </div>


          {/* DIGITAL EXPERIENCES */}

          <div className={styles.group}>
            <h3 data-cursor="video">
              Digital Experiences
            </h3>

            <ul>
              <li>Websites</li>
              <li>Digital Products</li>
              <li>E-commerce</li>
              <li>Landing Pages</li>
              <li>Campaign Experiences</li>
              <li>Interactive Experiences</li>
              <li>UX &amp; Usability Audits</li>
              <li>Digital Experience Audits</li>
              <li>Performance &amp; Technical Audits</li>
              <li>Design Reviews &amp; Recommendations</li>
              <li>Improving existing experiences</li>
            </ul>
          </div>


          {/* DESIGN & BUILD */}

          <div className={styles.group}>
            <h3 data-cursor="video">
              Design &amp; Build
            </h3>

            <ul>
              <li>Interface Design</li>
              <li>Design Systems</li>
              <li>Wireframes &amp; Prototypes</li>
              <li>Interaction Design</li>
              <li>Motion &amp; Animation</li>
              <li>Responsive Experiences</li>
              <li>CMS Implementation</li>
              <li>WordPress &amp; WooCommerce</li>
              <li>Liferay</li>
              <li>Design to Code</li>
              <li>Turning ideas into working experiences</li>
              <li>From concept to final implementation</li>
            </ul>
          </div>

        </div>

      </Container>
    </section>
  );
}
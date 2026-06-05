import styles from "./Footer.module.scss";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">

        <div className={styles.socials}>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
          <a href="#">Instagram</a>
        </div>

        <div className={styles.bottom}>
          <span>
            Designed and Built by David Murillo.
          </span>

          <div className={styles.symbol}>
            <Image
                src="/logos/ciclikmedia-symbol.svg"
                alt="Ciclikmedia"
                width={22}
                height={22}
            />
          </div>
        </div>

      </div>
    </footer>
  );
}
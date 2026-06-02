import Link from "next/link";
import Logo from "@/components/ui/Logo";

import styles from "./Hero.module.scss";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className="container">
        <div className={styles.navbarInner}>
          <div className={styles.logo}>
            <Logo />
          </div>

          <nav aria-label="Main navigation">
            <ul className={styles.nav}>
              <li>
                <Link href="/work">
                  Work
                </Link>
              </li>

              <li>
                <Link href="/expertise">
                  Expertise
                </Link>
              </li>

              <li>
                <Link href="/about">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
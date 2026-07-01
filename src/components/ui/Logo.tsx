import Image from "next/image";
import Link from "next/link";
import { RefObject } from "react";

import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <Link
      href="/"
      className={styles.logo}
      aria-label="Ciclikmedia"
    >
      <img
        className={styles.wordmark}
        src="/logos/ciclikmedia-wordmark.svg"
        alt="Ciclikmedia"
        width={273}
        height={44}
      />

      <img
        className={styles.symbol}
        src="/logos/ciclikmedia-symbol.svg"
        alt=""
        width={31}
        height={33}
        aria-hidden="true"
      />
    </Link>
  );
}
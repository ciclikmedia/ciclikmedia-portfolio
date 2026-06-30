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
      <Image
        className={styles.wordmark}
        src="/logos/ciclikmedia-wordmark.svg"
        alt="Ciclikmedia"
        width={273.09}
        height={43.71}
        priority
      />

      <Image
        className={styles.symbol}
        src="/logos/ciclikmedia-symbol.svg"
        alt=""
        width={31.02}
        height={32.65}
        priority
      />
    </Link>
  );
}
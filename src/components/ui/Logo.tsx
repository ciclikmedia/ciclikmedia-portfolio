'use client';

import Link from "next/link";

import styles from "./Logo.module.scss";

export default function Logo() {
  const handleClick = () => {
    window.dispatchEvent(new Event("cursor:hide"));
  };

  return (
    <Link
      href="/"
      className={styles.logo}
      aria-label="Ciclikmedia"
      onClick={handleClick}
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
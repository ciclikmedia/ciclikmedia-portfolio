'use client';

import Link from "next/link";

import styles from "./Logo.module.scss";

interface LogoProps {
  clickable?: boolean;
}

export default function Logo({
  clickable = true,
}: LogoProps) {
  const handleClick = () => {
    window.dispatchEvent(new Event("cursor:hide"));
  };

  const content = (
    <>
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
    </>
  );

  if (!clickable) {
    return (
      <div
        className={styles.logo}
        aria-label="Ciclikmedia"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href="/"
      className={styles.logo}
      aria-label="Ciclikmedia"
      onClick={handleClick}
    >
      {content}
    </Link>
  );
}
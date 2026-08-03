'use client';

import Link from "next/link";

import styles from "./Logo.module.scss";

interface LogoProps {
  clickable?: boolean;

  size?: "hero" | "header";
}

export default function Logo({
  clickable = true,
  size = "hero",
}: LogoProps) {
  const handleClick = () => {
    window.dispatchEvent(new Event("cursor:hide"));
  };

  const className =
  `${styles.logo} ${styles[size]}`;

  const content = (
    <>
      <img
        className={styles.wordmark}
        src="/logos/ciclikmedia-wordmark.svg"
        alt="Ciclikmedia"
        width={273}
        height={44}
        draggable={false}
      />

      <img
        className={styles.symbol}
        src="/logos/ciclikmedia-symbol.svg"
        alt=""
        width={31}
        height={33}
        aria-hidden="true"
        draggable={false}
      />
    </>
  );

  if (!clickable) {
    return (
      <div
        className={className}
        aria-label="Ciclikmedia"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href="/"
       className={className}
      aria-label="Ciclikmedia"
      onClick={handleClick}
    >
      {content}
    </Link>
  );
}
import Image from "next/image";

import styles from "./ProjectFullscreenImage.module.scss";

interface Props {
  src: string;
  alt: string;
}

export default function ProjectFullscreenImage({
  src,
  alt,
}: Props) {
  return (

    <figure className={styles.figure}>

      <Image
        src={src}
        alt={alt}
        fill
        priority={false}
        sizes="100vw"
        className={styles.image}
      />

    </figure>

  );
}
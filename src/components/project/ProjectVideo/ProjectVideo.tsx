import styles from "./ProjectVideo.module.scss";

interface Props {
  src: string;
  poster?: string;
}

export default function ProjectVideo({
  src,
  poster,
}: Props) {
  return (
    <div className={styles.video}>
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
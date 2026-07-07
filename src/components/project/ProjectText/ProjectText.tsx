import styles from "./ProjectText.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function ProjectText({
  children,
}: Props) {
  return (
    <div className={styles.text}>
      {children}
    </div>
  );
}
import styles from "./ProjectChapter.module.scss";

interface Props {
  number: string;
  title: string;
}

export default function ProjectChapter({
  number,
  title,
}: Props) {

  return (

    <header className={styles.chapter}>

      <span>{number}</span>

      <h2>{title}</h2>

    </header>

  );

}
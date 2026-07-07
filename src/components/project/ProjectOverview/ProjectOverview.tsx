import ProjectMeta from "../ProjectMeta/ProjectMeta";

import styles from "./ProjectOverview.module.scss";

interface Props {
  overview: string;
  client: string;
  year: string;
  role: string;
  services: string[];
}

export default function ProjectOverview({
  overview,
  client,
  year,
  role,
  services,
}: Props) {

  return (

    <div className={styles.overview}>

      <div className={styles.text}>

        <p>{overview}</p>

      </div>

      <ProjectMeta
        client={client}
        year={year}
        role={role}
        services={services}
      />

    </div>

  );

}
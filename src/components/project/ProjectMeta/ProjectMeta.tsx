import styles from "./ProjectMeta.module.scss";

interface Props {
  client: string;
  year: string;
  role: string;
  services: string[];
}

export default function ProjectMeta({
  client,
  year,
  role,
  services,
}: Props) {
  return (
    <div className={styles.meta}>

      <div>
        <span>Client</span>
        <p>{client}</p>
      </div>

      <div>
        <span>Year</span>
        <p>{year}</p>
      </div>

      <div>
        <span>Role</span>
        <p>{role}</p>
      </div>

      <div>
        <span>Services</span>

        <ul>
          {services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>

      </div>

    </div>
  );
}
import styles from "./SelectedBrands.module.scss";

const brands = [
  {
    logo: "MALASPINA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "PEUGEOT MOTOCYCLES",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "PINGÜINO TORREBLANCA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
];

export default function SelectedBrands() {
  return (
    <section className={styles.selectedBrands}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            SELECTED BRANDS
          </span>

          <h2>
            Brands I've worked with.
          </h2>

          <p>
            Through agencies, collaborations and direct engagements,
            I've contributed to digital products, campaigns and experiences
            for global brands and organizations.
          </p>
        </div>

        <div className={styles.grid}>
          {brands.map((brand, index) => (
            <article
              key={index}
              className={styles.card}
            >
              <div className={styles.logo}>
                {brand.logo}
              </div>

              <div className={styles.divider} />

              <p>{brand.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.progress}>
          <span />
        </div>
      </div>
    </section>
  );
}
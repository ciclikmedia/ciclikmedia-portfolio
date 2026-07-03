'use client';

import styles from "./ProjectHero.module.scss";

interface Props {
    project: {
        title: string;
        image: string;
        slug: string;
        services: string[];
    };
}

export default function ProjectHero({
    project,
}: Props) {

    return (

        <section className={styles.hero}>

            <h1>{project.title}</h1>

        </section>

    );

}
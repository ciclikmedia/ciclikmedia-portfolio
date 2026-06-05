import { ReactNode } from "react";

interface PageHeroProps {
  children: ReactNode;
}

export default function PageHero({
  children,
}: PageHeroProps) {
  return (
    <section>
      {children}
    </section>
  );
}
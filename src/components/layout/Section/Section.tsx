import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

export default function Section({
  children,
}: SectionProps) {
  return (
    <section>
      {children}
    </section>
  );
}
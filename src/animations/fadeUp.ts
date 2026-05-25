import gsap from '@/lib/gsap';

type FadeUpOptions = {
  delay?: number;
  duration?: number;
};

export function fadeUp(
  element: HTMLElement,
  options?: FadeUpOptions
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,

      duration: options?.duration ?? 1.2,
      delay: options?.delay ?? 0,

      ease: 'power4.out',
    }
  );
}
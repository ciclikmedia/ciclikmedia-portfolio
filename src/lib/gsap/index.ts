'use client';

import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(
  ScrollTrigger,
  Flip,
);

export {
  ScrollTrigger,
  Flip,
};

export default gsap;
'use client';

import gsap from 'gsap';

let ScrollTrigger: any;

if (typeof window !== 'undefined') {
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);
}

export { ScrollTrigger };

export default gsap;
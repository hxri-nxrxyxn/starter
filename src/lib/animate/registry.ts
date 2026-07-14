import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase, MotionPathPlugin);

gsap.defaults({
  duration: 0.4,
  ease: "power2.out",
});

CustomEase.create("premium-bounce", "M0,0 C0.34,1.2 0.4,1 1,1");
CustomEase.create("premium-spring", "M0,0 C0.2,1.3 0.35,1 1,1");
CustomEase.create("premium-smooth", "M0,0 C0.25,0.1 0.25,1 1,1");
CustomEase.create("premium-elastic", "M0,0 C0.4,1.6 0.6,1 1,1");

export { gsap, ScrollTrigger };

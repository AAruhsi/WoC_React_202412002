import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <>
      <div className="flex justify-center mt-10">
        <Navbar />
      </div>
      <div className="w-screen h-screen flex flex-col justify-center items-center text-center">
        <h1
          ref={titleRef}
          className="font-helvita text-[9rem] font-bold leading-snug"
        >
          CodeCanvas
        </h1>
        <h3
          ref={subtitleRef}
          className="font-helvitaLight text-3xl leading-tight"
        >
          Forge Ideas into Reality, One Line at a Time
        </h3>
        <p
          ref={textRef}
          className="font-helvitaLight text-center text-2xl mt-3 leading-6"
        >
          Unleash your coding potential. Dive into a next-generation experience
          with a focus on beautiful design,
          <br />
          intuitive features, and unmatched flexibility.
        </p>
      </div>
    </>
  );
};

export default Hero;

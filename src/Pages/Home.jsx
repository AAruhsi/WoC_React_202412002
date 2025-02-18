import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    gsap.from(".video", {
      width: "0%",
      duration: 1.5,
      scrollTrigger: {
        trigger: ".page2",
        start: "top 80%",
        end: "top 20%",
        scrub: 0.5,
        markers: true, // Remove in production
      },
    });
  }, []);

  return (
    <>
      <div className="main w-screen min-h-screen relative overflow-x-hidden">
        <Hero />

        {/* Video Section Right After Hero */}
        <div className="page2 w-screen h-screen flex justify-center items-center px-10 ">
          <div className="w-[80%] h-fit rounded-lg flex justify-center items-center ">
            <video
              src="/codeCanvas.mp4"
              autoPlay
              loop
              muted
              className="video w-full h-[80%] rounded-2xl object-fill shadow-xl"
            />
          </div>
        </div>

        <Features />
        <Footer />
      </div>
    </>
  );
};

export default Home;

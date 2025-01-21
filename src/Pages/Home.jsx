import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Page2 from "../components/Page2";
import Page3 from "../components/Page3";
import { useEffect } from "react";

const Home = () => {
  //   useEffect(() => {
  //     // Ensure VANTA is available on the global `window` object
  //     if (window.VANTA) {
  //       const wavesEffect = VANTA.WAVES({
  //         el: ".main",
  //         mouseControls: true,
  //         touchControls: true,
  //         gyroControls: false,
  //         minHeight: 200.0,
  //         minWidth: 200.0,
  //         scale: 1.0,
  //         scaleMobile: 1.0,
  //         color: 0x0,
  //         shininess: 131.0,
  //         waveHeight: 19.0,
  //         waveSpeed: 0.55,
  //         zoom: 1.0,
  //       });

  //       // Cleanup on component unmount
  //       return () => {
  //         if (wavesEffect) wavesEffect.destroy();
  //       };
  //     }
  //   }, []);

  return (
    <>
      <div className="main w-screen h-screen relative overflow-x-hidden bg-black">
        <div className="flex justify-center mt-10">
          <Navbar />
        </div>
        <Hero />
        <Page2 />
        <Page3 />
      </div>
    </>
  );
};

export default Home;

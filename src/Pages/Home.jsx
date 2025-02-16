import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import { Video } from "lucide-react";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="main w-screen h-screen  relative overflow-x-hidden ">
        <div>
          <Hero />
        </div>
        <div className=" w-screen h-screen flex justify-center items-center px-10">
          <div className=" w-[90%] h-fit rounded-lg  flex justify-center items-center ">
            <video
              src="/codeCanvas.mp4"
              autoPlay
              loop
              muted
              className="w-full h-fit rounded-2xl object-fill shadow-xl"
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

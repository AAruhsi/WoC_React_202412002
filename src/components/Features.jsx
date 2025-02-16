import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaRocket,
  FaLock,
  FaMobile,
  FaBrain,
  FaCloud,
  FaSyncAlt,
  FaTools,
  FaUniversalAccess,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    title: "Speed Optimization",
    desc: "Lightning-fast performance and reduced load times.",
    color: "from-blue-500 to-purple-500",
    icon: <FaRocket />,
  },
  {
    title: "Secure Authentication",
    desc: "Advanced encryption ensures your data is safe.",
    color: "from-green-500 to-teal-500",
    icon: <FaLock />,
  },
  {
    title: "Seamless UI",
    desc: "Smooth and responsive user experience.",
    color: "from-yellow-500 to-orange-500",
    icon: <FaMobile />,
  },
  {
    title: "AI-powered Insights",
    desc: "Smart analytics with AI-driven predictions.",
    color: "from-pink-500 to-red-500",
    icon: <FaBrain />,
  },
  {
    title: "Cloud Integration",
    desc: "Sync your data effortlessly across devices.",
    color: "from-indigo-500 to-blue-500",
    icon: <FaCloud />,
  },
  {
    title: "Real-time Updates",
    desc: "Instant data sync without refresh.",
    color: "from-red-500 to-orange-500",
    icon: <FaSyncAlt />,
  },
  {
    title: "Advanced Customization",
    desc: "Tailor your experience with deep settings.",
    color: "from-teal-500 to-green-500",
    icon: <FaTools />,
  },
  {
    title: "Enhanced Accessibility",
    desc: "Designed for everyone, regardless of ability.",
    color: "from-purple-500 to-pink-500",
    icon: <FaUniversalAccess />,
  },
];

const Features = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none none",
          markers: true,
        },
      }
    );
  }, [cardsRef.current]);

  return (
    <>
      <h1 className="font-helvita text-5xl text-center my-10">Our Features</h1>
      <div className=" main w-screen min-h-screen flex justify-center items-center p-10 ">
        {/* Masonry Layout */}
        <div className="features-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 max-w-7xl w-full space-y-5">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className=" p-6 rounded-2xl shadow-xl  break-inside-avoid  hover:bg-gray-50"
              style={{ minHeight: `${200 + (index % 3) * 80}px` }} // Different heights for Masonry
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h2 className="text-xl font-bold">{feature.title}</h2>
              <p className="mt-2 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Features;

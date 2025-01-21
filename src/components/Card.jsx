import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Card = () => {
  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const front = frontRef.current;
    const back = backRef.current;

    // Initialize GSAP timeline
    const tl = gsap.timeline({ paused: true });

    // Flip animation for the card
    tl.to(card, { rotationY: 180, duration: 0.6, ease: "power2.inOut" });

    // Show back face and hide front face during flip
    tl.to(
      front,
      { opacity: 0, duration: 0.3, ease: "power2.inOut" },
      "<" // Sync with previous animation
    ).to(
      back,
      { opacity: 1, duration: 0.3, ease: "power2.inOut" },
      "<0.3" // Slight delay for smoother transition
    );

    // Add hover event listeners
    const handleMouseEnter = () => {
      tl.play(); // Play flip animation
    };

    const handleMouseLeave = () => {
      tl.reverse(); // Reverse flip animation
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners
    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="card-container w-[190px] h-[254px] perspective mx-auto"
      style={{
        perspective: "1000px", // Enables the 3D effect
        position: "relative",
      }}
    >
      <div
        className="card w-full h-full bg-transparent"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center",
          position: "relative",
        }}
      >
        {/* Front Side */}
        <div
          ref={frontRef}
          className="front absolute inset-0 bg-zinc-700 rounded-lg flex justify-center items-center shadow-2xl"
        >
          <span className="text-xl text-white">Multiple Themes</span>
        </div>

        {/* Back Side */}
        <div
          ref={backRef}
          className="back absolute inset-0 bg-zinc-400 rounded-lg flex justify-center items-center shadow-2xl"
          style={{
            transform: "rotateY(180deg)", // Back side starts flipped
            opacity: 0, // Initially hidden
          }}
        >
          <span className="text-center text-lg text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

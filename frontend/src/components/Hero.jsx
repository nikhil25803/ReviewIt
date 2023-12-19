import React from "react";
import Lottie from "lottie-react";
import HeroSectionAnimation from "../assets/animation/HeroSectionAnimation.json";
const Hero = () => {
  return (
    <section className="w-full bg-backgroundLight">
      <div className="max-w-[1280px] mx-auto  flex flex-row justify-between items-center p-4 h-[90vh]">
        <div className="flex-1 flex flex-col gap-5 justify-start">
          <h1 className="text-4xl text-textWhite font-quantico">
            Elevate Your <span className="text-textLight">Resume</span> with
            Global Mentorship
          </h1>
          <p className="text-xl text-textDark font-poppins font-semibold">
            Connect with mentors worldwide for personalized resume feedback on
            <span className="text-textLight"> Review It</span>, a free and
            open-source platform. Elevate your professional story, whether
            you're entering the job market or making a career change.
          </p>
          <button className="mr-auto text-lg text-backgroundLight font-semibold bg-buttonPrimary rounded-lg w-[200px] py-3 my-4 hover:bg-backgroundLight hover:text-textWhite transition  duration-300">
            Get Started
          </button>
        </div>
        <div className="hidden md:block flex-1">
          <Lottie animationData={HeroSectionAnimation} />
        </div>
      </div>
    </section>
  );
};

export default Hero;

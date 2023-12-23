import React, { useContext } from "react";
import Lottie from "lottie-react";
import HeroSectionAnimation from "../assets/animation/HeroSectionAnimation.json";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
const Hero = () => {
  const { status } = useContext(AuthContext);
  return (
    <section className="w-full  bg-backgroundLight">
      <div className="max-w-[1280px] mx-auto h-[80vh] md:h-fit flex flex-row justify-between items-center p-4 ">
        <div className="flex-1 flex flex-col gap-5 justify-start">
          <h1 className="text-3xl md:text-4xl text-textWhite font-quantico">
            Elevate Your <span className="text-textLight">Resume</span> with
            Global Mentorship
          </h1>
          <p className="text-lg md:text-xl text-textDark font-poppins font-semibold">
            Connect with mentors worldwide for personalized resume feedback on
            <span className="text-textLight"> Review It</span>, a free and
            open-source platform. Elevate your professional story, whether
            you're entering the job market or making a career change.
          </p>
          {status !== "authenticated" ? (
            <Link
              className="mr-auto text-lg text-center text-backgroundLight font-semibold bg-buttonPrimary rounded-lg  px-10 py-3 my-4 hover:bg-backgroundLight hover:text-textWhite transition  duration-300 font-poppins"
              to={"/login"}
            >
              Join Us
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="hidden md:block flex-1 mb-36">
          <Lottie animationData={HeroSectionAnimation} />
        </div>
      </div>
    </section>
  );
};

export default Hero;

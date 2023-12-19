import React from "react";
import StatisticsANimation from "../assets/animation/StatisticsAnimation.json";
import Lottie from "lottie-react";
import StatisticsCard from "./StatisticsCard";

const Statistics = () => {
  return (
    <section className="w-full bg-backgroundLight text-textWhite">
      <div className="max-w-[1280px] mx-auto p-4 h-fit flex flex-row justify-between items-center py-10">
        <div className="flex-1 flex flex-col gap-10">
          <h1 className="text-4xl text-textWhite font-quantico">
            Some Numbers <span className="text-textLight">...</span>
          </h1>
          <div className="grid mx-auto sm:mx-0 sm:grid-cols-2 gap-10">
            <StatisticsCard number={100} title={"Users"} />
            <StatisticsCard number={50} title={"Requests"} />
            <StatisticsCard number={25} title={"Reviews"} />
            <StatisticsCard number={200} title={"Resume(s)"} />
          </div>
        </div>
        <div className="flex-1 hidden lg:block">
          <Lottie animationData={StatisticsANimation} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Statistics;

import Lottie from "lottie-react";
import React from "react";
import NotFound from "../assets/animation/NotFound.json";
const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-backgroundLight py-10">
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-[500px] md:max-w-[750px] max-h-screen">
          <Lottie animationData={NotFound} />
        </div>
        <div className="text-textWhite text-2xl px-5 py-5 font-semibold font-poppins bg-backgroundDark rounded-lg">
          <h1 className="font-quantico">User Not Found</h1>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

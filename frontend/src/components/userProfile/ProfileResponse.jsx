import React from "react";
import ResponseCard from "../cards/ResponseCard";

const ProfileResponse = () => {
  return (
    <div>
      <div className="bg-backgroundDark mt-10 p-4 text-white font-poppins rounded-lg">
        <div className="font-quantico text-2xl">
          Your Responses <span className="text-textLight">...</span>
        </div>
        <div className="mt-5 h-fit grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
          <ResponseCard />
        </div>
      </div>
    </div>
  );
};

export default ProfileResponse;

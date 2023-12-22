import React from "react";
import RequestCards from "../cards/RequestCards";

const ProfileRequests = () => {
  return (
    <div className="bg-backgroundDark mt-10 p-4 text-white font-poppins rounded-lg">
      <div className="font-quantico text-2xl">
        Requests <span className="text-textLight">...</span>
      </div>
      <div className="mt-5 h-fit grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
        <RequestCards />
      </div>
    </div>
  );
};

export default ProfileRequests;

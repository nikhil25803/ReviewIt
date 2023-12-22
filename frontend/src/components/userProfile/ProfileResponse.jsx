import React from "react";
import ResponseCard from "../cards/ResponseCard";

const ProfileResponse = (props) => {
  // Collecting Props
  const data = props.props;

  // Getting the requests data
  const responseData = data.response;
  return (
    <div>
      <div className="bg-backgroundDark mt-10 p-4 text-white font-poppins rounded-lg">
        <div className="font-quantico text-2xl">
          Your Responses <span className="text-textLight">...</span>
        </div>
        <div className="mt-5 h-fit grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
          {responseData.length >= 1 ? (
            responseData.map((res) => {
              let resData = {
                avatar: res.avatar,
                responsemessage: res.responsemessage,
                email: res.email,
                requestedat: res.requestedat,
                resumelink: res.resumelink,
                name: res.name,
              };
              return <ResponseCard key={res.id} props={resData} />;
            })
          ) : (
            <div className="flex flex-row justify-center items-center">
              <h1>No response available</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileResponse;

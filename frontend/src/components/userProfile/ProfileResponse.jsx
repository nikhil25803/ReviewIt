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
                description: res.description,
                email: res.email,
                requestedat: res.requestedat,
                resumelink: res.resumelink,
                name: res.name,
              };
              return <ResponseCard key={res.id} props={resData} />;
            })
          ) : (
            <div className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal">
              <div className="text-textWhite text-lg font-semibold">
                <h1>
                  Not submitted any
                  <span className="text-textLight "> response </span> yet.
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileResponse;

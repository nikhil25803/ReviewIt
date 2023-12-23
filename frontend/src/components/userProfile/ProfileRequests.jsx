import React from "react";
import RequestCards from "../cards/RequestCards";

const ProfileRequests = (props) => {
  // Collecting Props
  const data = props.props;

  // Getting the requests data
  const requestData = data.requests;

  return (
    <div className="bg-backgroundDark mt-10 p-4 text-white font-poppins rounded-lg">
      <div className="font-quantico text-2xl">
        Requests <span className="text-textLight">...</span>
      </div>
      <div className="mt-5 h-fit grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
        {requestData.length >= 1 ? (
          requestData.map((req) => {
            let reqData = {
              avatar: req.avatar,
              description: req.description,
              email: req.email,
              requestedat: req.requestedat,
              resumelink: req.resumelink,
              name: req.name,
            };
            return <RequestCards key={req.id} props={reqData} />;
          })
        ) : (
          <div className="flex flex-row justify-center items-center">
            <h1>No requests available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileRequests;

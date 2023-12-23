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
              requestid: req.requestid,
              resumelink: req.resumelink,
              name: req.name,
            };
            return <RequestCards key={req.id} props={reqData} />;
          })
        ) : (
          <div className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal">
            <div className="text-textWhite text-lg font-semibold">
              <h1>
                No
                <span className="text-textLight "> request </span> data
                available.
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileRequests;

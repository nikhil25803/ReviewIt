import React, { useEffect, useState } from "react";
import RequestCards from "../cards/RequestCards";
import RequestCardAll from "../cards/RequestCardCompleted";

const ProfileRequests = (props) => {
  // Collecting Props
  const data = props.props;

  // Getting the requests data
  const requestData = data.requests;

  // States
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activePage, setActivePage] = useState("pending");

  useEffect(() => {
    setPendingRequests([]);

    const pendingReqs = [];
    data.requests.forEach((request) => {
      if (request.responded === false) {
        pendingReqs.push(request);
      }
    });
    setPendingRequests(pendingReqs);
  }, []);

  // Render all request component
  const renderAllPages = () => {
    setActivePage("all");
  };

  // Render pending request component Page
  const renderPendingPages = () => {
    setActivePage("pending");
  };

  return (
    <div className="bg-backgroundDark mt-10 p-4 text-white font-poppins rounded-lg">
      <div className="font-quantico text-xl md:text-2xl flex flex-col justify-center items-center gap-4   ">
        <div>
          Requests <span className="text-textLight">...</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-5 bg-backgroundLight rounded-lg px-2 py-2 md:px-4 md:py-4 text-base md:text-lg mx-auto">
          <button
            className={
              activePage == "pending"
                ? "bg-backgroundDark px-3 py-3 rounded-lg"
                : "bg-backgroundLight px-3 py-3 rounded-lg"
            }
            onClick={renderPendingPages}
          >
            Pending
          </button>
          <button
            className={
              activePage == "all"
                ? "bg-backgroundDark px-3 py-3 rounded-lg"
                : "bg-backgroundLight px-3 py-3 rounded-lg"
            }
            onClick={renderAllPages}
          >
            All
          </button>
        </div>
      </div>
      <div className="mt-5 h-fit grid grid-cols-1 md:grid-cols-2  gap-4 rounded-lg">
        {activePage === "pending" ? (
          pendingRequests.length > 0 ? (
            pendingRequests.map((req) => {
              let reqData = {
                avatar: req.avatar
                  ? req.avatar
                  : "https://lh3.googleusercontent.com/a/ACg8ocJ-WWqNiQv0BppwWISN_SyIT6Xk3pPNVefijlfE7Hbc=s96-c",
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
            <div className="bg-backgroundLight w-full mx-auto mt-5 rounded-lg flex justify-center items-center p-2 h-fit">
              <div className="text-textWhite text-lg font-semibold flex justify-center items-center">
                <h1>
                  No <span className="text-textLight">Pending request</span>{" "}
                  available.
                </h1>
              </div>
            </div>
          )
        ) : activePage === "all" ? (
          requestData.length > 0 ? (
            requestData.map((req) => {
              let reqData = {
                avatar: req.avatar
                  ? req.avatar
                  : "https://lh3.googleusercontent.com/a/ACg8ocJ-WWqNiQv0BppwWISN_SyIT6Xk3pPNVefijlfE7Hbc=s96-c",
                description: req.description,
                email: req.email,
                requestedat: req.requestedat,
                requestid: req.requestid,
                resumelink: req.resumelink,
                name: req.name,
              };
              return <RequestCardAll key={req.id} props={reqData} />;
            })
          ) : (
            <div className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal place-self-center">
              <div className="text-textWhite text-lg font-semibold">
                <h1>
                  No
                  <span className="text-textLight "> requests </span>
                  available.
                </h1>
              </div>
            </div>
          )
        ) : (
          <div className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal place-self-center">
            <div className="text-textWhite text-lg font-semibold">
              <h1>
                No
                <span className="text-textLight "> data </span>
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

/*
 <div className="mt-5 h-fit grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
      {activePage === "pending" ? (
        pendingRequests.length > 0 ? (
          pendingRequests.map((req) => {
            pendingRequests.length >= 1 && activePage === "all" ? (
          pendingRequests.map((req) => {
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
          }
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
        )
      ) : activePage === "all" ? (
        requestData.length > 0 ? (
          requestData.map((req) => {
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
            return <RequestCardAll key={req.id} props={reqData} />;
          }
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
        )
      ) : (<div className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal">
            <div className="text-textWhite text-lg font-semibold">
              <h1>
                No
                <span className="text-textLight "> request </span> data
                available.
              </h1>
            </div>
          </div>)}
    </div>
*/

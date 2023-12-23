import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const RequestCards = (props) => {
  // Collecting Requests
  const requestCardData = props.props;

  return (
    <div className="bg-backgroundLight p-4 mx-auto font-poppins rounded-lg flex ">
      <div className="flex flex-col gap-5 justify-between items-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 justify-start items-center">
            <img
              src={requestCardData.avatar ? requestCardData.avatar : "#"}
              alt="image"
            />
            <div className="flex flex-col justify-center items-start">
              <h1 className="font-quantico text-xl">
                {requestCardData.name ? requestCardData.name : "Anonymus"}
              </h1>
              <p className="text-slate-500">{requestCardData.email}</p>
              <a
                className="text-slate-500 hover:text-textLight"
                target="_blank"
                href={
                  requestCardData.resumelink ? requestCardData.resumelink : "#"
                }
              >
                Resume
              </a>
            </div>
          </div>
          <div className="break-words overflow-hidden">
            <div>{requestCardData.description}</div>
          </div>
        </div>
        <div className="border-t-2 p-2">
          <button className="flex flex-row justify-center items-center text-l font-quantico gap-5 bg-backgroundDark p-4 rounded-lg hover:scale-105 duration-300">
            Submit a Review{" "}
            <span className="text-textLight">
              <FaAngleDoubleRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCards;

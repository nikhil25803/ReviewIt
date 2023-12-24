import React, { Fragment, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import ResponseModal from "../ResponseModal";

const RequestCards = (props) => {
  // Collecting Requests
  const requestCardData = props.props;

  // State to handle modal
  const [modalState, setModalState] = useState(false);
  const data = {
    requestdata: requestCardData,
    modalVisible: modalState,
    setModalStateFunction: () => setModalState(false),
  };

  return (
    <Fragment>
      <div className="bg-backgroundLight p-4 mx-auto font-poppins rounded-lg flex w-full">
        <div className="flex flex-col gap-5 justify-between items-center">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 justify-start items-center">
              <img
                src={requestCardData.avatar ? requestCardData.avatar : "#"}
                alt="image"
                className="rounded-lg"
              />
              <div className="flex flex-col justify-center items-start overflow-hidden">
                <h1 className="font-quantico text-xl">
                  {requestCardData.name ? requestCardData.name : "Anonymus"}
                </h1>
                <p className="text-slate-500">{requestCardData.email}</p>
                <a
                  className="text-slate-500 hover:text-textLight"
                  target="_blank"
                  href={
                    requestCardData.resumelink
                      ? requestCardData.resumelink
                      : "#"
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
            <button
              className="flex flex-row justify-center items-center text-l font-quantico gap-5 bg-backgroundDark p-4 rounded-lg hover:scale-105 duration-300"
              onClick={() => setModalState(true)}
            >
              Submit a Review{" "}
              <span className="text-textLight">
                <FaAngleDoubleRight />
              </span>
            </button>
          </div>
        </div>
      </div>
      <ResponseModal props={data} />
    </Fragment>
  );
};

export default RequestCards;

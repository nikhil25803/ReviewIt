import React from "react";

const ResponseCard = (props) => {
  // Collecting Response
  const responseCardData = props.props;

  return (
    <div>
      <div className="bg-backgroundLight p-4 w-full mx-auto font-poppins rounded-lg">
        <div className="flex flex-col gap-5 justify-between items-center">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 justify-start items-center">
              <img
                src={responseCardData.avatar ? responseCardData.avatar : "#"}
                alt="image"
              />
              <div className="flex flex-col justify-center items-start">
                <h1 className="font-quantico text-xl">
                  {responseCardData.name ? responseCardData.name : "Anonymus"}
                </h1>
                <p className="text-slate-500">{responseCardData.email}</p>
                <a
                  className="text-slate-500 hover:text-textLight"
                  target="_blank"
                  href={
                    responseCardData.resumelink
                      ? responseCardData.resumelink
                      : "#"
                  }
                >
                  Resume
                </a>
              </div>
            </div>
            <div>
              <div className="font-quantico text-xl ">Submitted Review </div>
              <div className="font-base my-1">
                {responseCardData.responsemessage}
              </div>
            </div>
          </div>
          <div className="border-t-2 p-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;

const RequestCardAll = (props) => {
  // Collecting Requests
  const requestCardData = props.props;

  return (
    <div className="bg-backgroundLight p-4 mx-auto font-poppins rounded-lg flex w-full">
      <div className="flex flex-col gap-5 justify-between items-center">
        <div className="flex flex-col gap-4 break-words overflow-hidden">
          <div className="flex flex-row gap-4 justify-start items-center ">
            <img
              src={requestCardData.avatar ? requestCardData.avatar : "#"}
              alt="image"
              className="rounded-full"
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
                  requestCardData.resumelink ? requestCardData.resumelink : "#"
                }
              >
                Resume
              </a>
            </div>
          </div>
          <div className="break-words overflow-hidden">
            <div className="font-quantico text-lg md:text-xl text-textLight">
              Message{" "}
            </div>
            <div>
              {requestCardData.description
                ? requestCardData.description
                : "No message/description provided"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCardAll;

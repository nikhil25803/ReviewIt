import React, { useEffect, useState } from "react";
import { userAPIService } from "../apis/UserAPI";

const ResponseModal = (props) => {
  // Collecting Props
  const modalData = props.props;

  // Collecting Request Data
  const requestData = modalData.requestdata;

  // In case modal data is not provided
  if (!requestData || !modalData || !modalData.modalVisible) {
    return null;
  }
  // State to handle review status
  const [reviewStatus, setReviewStatus] = useState("initial");

  // State to handle review
  const [review, setReview] = useState("");
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    setReviewStatus("initial");
    setReview("");
    setToken("");
    setUid("");
    const sessionObject = JSON.parse(localStorage.getItem("auth"));
    if (sessionObject && sessionObject["token"]) {
      setToken(sessionObject["token"]);
      setUid(sessionObject["uid"]);
    }
  }, []);

  // Function to make API Calls
  const submitNewResponse = async (data, token) => {
    try {
      const response = await userAPIService.post(
        "api/requests/response",
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response && response.data) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  // Function to handle submission
  const validateAndSubmit = async (event) => {
    setReviewStatus("Processing ...");
    // Prevents the default form submission
    event.preventDefault();

    // Check if file is uploaded or not
    if (review === "") {
      setReviewStatus("Review field can't be empty");
      return;
    }

    // Populate payload with review and requestid
    const payloadData = {
      requestid: requestData.requestid,
      fromuserid: uid,
      responsemessage: review,
    };

    console.log(payloadData);

    // Make an API call passing the payload data
    try {
      // Make the API call for the payload
      submitNewResponse(payloadData, token)
        .then((response) => {
          if (response.status == 400) {
            setReviewStatus(`${response.message}`);
            setTimeout(() => {
              window.location.reload();
            }, 3500);
          } else if (response.status == 202) {
            setReviewStatus(`${response.message}`);
            setTimeout(() => {
              window.location.reload();
            }, 3500);
          } else {
            setReviewStatus("Server Error");
            setTimeout(() => {
              window.location.reload();
            }, 3500);
          }
        })
        .catch((error) => {
          setReviewStatus("Server Error");
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        });
    } catch (error) {
      setReviewStatus("Server Error");
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  };
  return (
    <div className="fixed inset-0 text-textWhite bg-backgroundDark bg-opacity-50 backdrop-blur flex justify-center  p-4 font-poppins">
      <div className="w-screen  mx-auto flex flex-col">
        <button
          className="text-2xl p-4 bg-backgroundLight rounded-full mb-5 font-bold font-quantico text-textLight place-self-end"
          onClick={() => modalData.setModalStateFunction()}
        >
          X
        </button>
        <div className="bg-backgroundLight p-10 rounded-lg max-h-screen overflow-y-auto">
          <div className="grid grid-cols-1 gap-5">
            <div className="bg-backgroundDark p-4 grid grid-cols-1 md:grid-cols-2  items-center ">
              <div className="flex flex-row">
                <img
                  src={requestData.avatar}
                  alt="user-profile-picture"
                  className="rounded-lg"
                />
                <div className="flex flex-col p-4 overflow-hidden">
                  <h1 className="text-2xl font-quantico">{requestData.name}</h1>
                  <p className="text-slate-400">{requestData.email}</p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 flex flex-col gap-2">
                <div className="font-quantico text-xl text-textLight">
                  Message
                </div>
                <p>{requestData.description}</p>
              </div>
            </div>
            <div className="bg-backgroundDark p-4 grid grid-cols-1  lg:grid-cols-2 gap-5 justify-center items-center h-fit">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-quantico text-textLight">
                  Resume
                </h1>

                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(
                    requestData.resumelink
                  )}&embedded=true`}
                  title="Resume"
                  className="rounded-lg h-96"
                ></iframe>
              </div>
              <div className="bg-backgroundDark ">
                <form
                  encType="multipart/form-data"
                  className="mt-4 font-poppins text-sm font-semibold grid grid-cols-1 gap-5 items-center"
                >
                  <div className="flex flex-col gap-2">
                    <div className="">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-lg text-textWhite dark:text-white"
                      >
                        Your Review <span className="text-textLight">...</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows="8"
                        className="block p-2.5 w-full text-textWhite  rounded-lg focus:ring-primary-500 bg-backgroundLight text-base"
                        placeholder="Your description here"
                        required
                      ></textarea>
                    </div>
                  </div>
                  {reviewStatus === "initial" ? (
                    <button
                      type="button"
                      className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal"
                      onClick={validateAndSubmit}
                    >
                      <div className="text-textWhite text-lg font-semibold">
                        <h1>
                          Submit
                          <span className="text-textLight "> ... </span>
                        </h1>
                      </div>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal"
                    >
                      <div className="text-textWhite text-lg font-semibold">
                        <h1>{reviewStatus}</h1>
                      </div>
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;

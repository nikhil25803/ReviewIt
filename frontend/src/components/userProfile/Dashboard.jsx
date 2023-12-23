import React, { useEffect, useState } from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import StatisticsCard from "../StatisticsCard";
import GooglePendingAnimation from "../../assets/animation/GooglePendingAnimation.json";
import GoogleLogoAnimation from "../../assets/animation/GoogleLogoAnimation.json";
import Lottie from "lottie-react";
import { auth } from "../../Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userAPIService } from "../../apis/UserAPI";

// React Component
const Dashboard = (props) => {
  // Collecting Props
  const dashboardData = props.props.data;

  // Navigation State
  const navigate = useNavigate();

  // New Google Provider for validation
  const googleProvider = new GoogleAuthProvider();

  // Make a state to store messages
  const [responseMessage, setResponseMessage] = useState("nothing");

  // Setting up form fields
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  // Reset everything on reload
  useEffect(() => {
    // Reset form fields
    setDescription("");
    setFile(null);
    setResponseMessage("nothing");
  }, []); // Empty dependency array to run only on mount and unmount

  // API Call to submit new request
  const submitANewRequest = async (data) => {
    try {
      const response = await userAPIService.post("api/requests/new", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response && response.data) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  // Function to make it possible
  const validateAndSubmit = async (event) => {
    // Prevents the default form submission
    event.preventDefault();
    setResponseMessage("checking");

    // Check if file is uploaded or not
    if (!file) {
      setResponseMessage("No files are uploaded");
      return;
    }

    const result = await signInWithPopup(auth, googleProvider);

    // New Form data state
    const formData = new FormData();

    // Try validating from Google
    if (result && result.user) {
      formData.append("name", result.user.displayName);
      formData.append("email", result.user.email);
      formData.append("avatar", result.user.photoURL);
      formData.append("userid", dashboardData.uid);
    } else {
      setResponseMessage("Unable to validate with google.");
      return;
    }

    formData.append("description", description);
    formData.append("file", file);

    // Initialize an empty object
    const requestFormData = {};

    // Iterate over formData entries
    for (let [key, value] of formData.entries()) {
      requestFormData[key] = value;
    }

    // Making API Call
    try {
      // Make the API call for the payload
      submitANewRequest(requestFormData)
        .then((response) => {
          if (response.status == 400) {
            setResponseMessage(`${response.message}`);
            setTimeout(() => {
              window.location.reload();
            }, 3500);
          } else if (response.status == 202) {
            setResponseMessage("submitted");
            setTimeout(() => {
              window.location.reload();
            }, 3500);
          } else {
            setResponseMessage(`Server Error`);
            setTimeout(() => {
              window.location.reload();
            }, 3500);
            return;
          }
        })
        .catch((error) => {
          setResponseMessage(`Server Error.`);
          setTimeout(() => {
            window.location.reload();
          }, 3500);
          return;
        });
    } catch (error) {
      setResponseMessage(`Server Error.`);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
      return;
    }
  };

  return (
    <div className="text-white flex flex-col justify-center items-center h-fit">
      <div className="bg-backgroundDark p-4 w-full mx-auto rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-start md:items-center ">
        <div className="flex flex-col justify-center items-center  p-4 rounded-lg gap-5">
          <div className="">
            <img
              className="rounded-full "
              src={
                dashboardData.avatar
                  ? dashboardData.avatar
                  : "https://lh3.googleusercontent.com/a/ACg8ocJ-WWqNiQv0BppwWISN_SyIT6Xk3pPNVefijlfE7Hbc=s96-c"
              }
            />
          </div>
          <div className=" p-4 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-2xl text-textLight font-quantico">
              {dashboardData.name}
            </h1>
            <h1 className="text-slate-500">/{dashboardData.username}</h1>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="p-4 w-full flex flex-row items-center justify-center md:justify-start gap-10 text-xl hover:scale-105 duration-300">
            <div className="hover:text-textLight duration-200 flex flex-row items-center justify-center gap-2">
              <BsLinkedin />
              <a
                className="text-white font-quantico"
                href={dashboardData.linkedin ? dashboardData.linkedin : "#"}
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
            <div className="hover:text-textLight duration-200 flex flex-row items-center justify-center gap-2">
              <BsGithub />
              <a
                className="text-white font-quantico"
                href={dashboardData.github ? dashboardData.github : "#"}
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="text-2xl font-quantico text-textLight">Bio</div>
            <p className="bg-backgroundLight font-poppins rounded-lg font-medium p-4 text-base hover:scale-105 duration-300">
              {dashboardData.bio ? dashboardData.bio : "..."}
            </p>
          </div>
        </div>
      </div>
      {/* Second Div  */}
      <div className="bg-backgroundDark p-6 mt-4 w-full mx-auto rounded-lg grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4 h-fit ">
        <div className="bg-backgroundLight p-4 rounded-lg text-2xl font-quantico text-textWhite ">
          About <span className="text-textLight">...</span>
          <p className=" text-base text-textWhite font-poppins font-medium ">
            {dashboardData.about ? dashboardData.about : "..."}
          </p>
        </div>
        <div className="bg-backgroundLight p-4 rounded-lg text-2xl font-quantico text-textWhite flex flex-col gap-4">
          <div>
            Stats <span className="text-textLight">...</span>
          </div>
          <div>
            <StatisticsCard
              number={
                dashboardData.requestCount ? dashboardData.requestCount : 0
              }
              title={"Requests Received"}
            />
          </div>
          <div>
            <StatisticsCard
              number={
                dashboardData.responseCount ? dashboardData.responseCount : 0
              }
              title={"Reviews Submitted"}
            />
          </div>
        </div>
      </div>
      {/* Third Div  */}
      <div className="bg-backgroundDark p-6 mt-10 w-full rounded-lg  font-quantico">
        <div className="grid grid-cols-1 justify-center items-center gap-10">
          <div className="flex flex-col justify-center">
            <div className="text-2xl">Want you resume to get reviewed?</div>
            <form
              encType="multipart/form-data"
              className="mt-4 font-poppins text-sm font-semibold grid grid-cols-1 md:grid-cols-2 gap-5 items-center"
            >
              <div className="flex flex-col gap-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-lg text-textWhite dark:text-white"
                  >
                    A message ...
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    rows="8"
                    className="block p-2.5 w-full text-textWhite  rounded-lg focus:ring-primary-500 bg-backgroundLight text-base"
                    placeholder="Your description here"
                  ></textarea>
                </div>

                <div>
                  <label
                    className="block mb-2 text-textWhite text-lg"
                    htmlFor="user_avatar"
                  >
                    Upload file
                  </label>
                  <input
                    className="block w-full bg-backgroundLight p-2.5  rounded-lg cursor-pointer "
                    aria-describedby="user_avatar_help"
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              <button
                type="button"
                className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal"
                onClick={validateAndSubmit}
              >
                {responseMessage === "nothing" ? (
                  <>
                    <div className="w-[50px] bg-backgroundLight rounded-full">
                      <Lottie animationData={GoogleLogoAnimation} />
                    </div>
                    <div className="text-textWhite text-lg font-semibold">
                      <h1>
                        Validate with
                        <span className="text-textLight "> Google </span> and
                        Submit.
                      </h1>
                    </div>
                  </>
                ) : responseMessage == "checking" ? (
                  <>
                    <div className="w-[50px] bg-backgroundLight rounded-full">
                      <Lottie animationData={GooglePendingAnimation} />
                    </div>
                    <div className="text-textWhite font-quantico text-lg font-semibold">
                      <h1>
                        Validating <span className="text-textLight">...</span>
                      </h1>
                    </div>
                  </>
                ) : responseMessage == "submitted" ? (
                  <>
                    <div className="w-[50px] bg-backgroundLight rounded-full">
                      <Lottie animationData={GooglePendingAnimation} />
                    </div>
                    <div className="text-textWhite font-quantico text-lg font-semibold">
                      <h1>Submitted !</h1>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-textWhite font-quantico text-lg font-semibold">
                      <h1>{responseMessage}</h1>
                    </div>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

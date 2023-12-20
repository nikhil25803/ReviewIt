import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userProfileData } from "../apis/UserAPI";
import { AuthContext } from "../context/AuthContext";
import Lottie from "lottie-react";
import NotFound from "../assets/animation/NotFound.json";

const Profile = () => {
  // Getting path param (slug)
  const params = useParams();

  // Username
  const query_username = params.username;

  // Context data for authorization
  const { status, sessionData } = useContext(AuthContext);

  // State to store API Data
  const [apiResponse, setapiResponse] = useState(null);

  // Making API Call to fetch profile data
  useEffect(() => {
    console.log(status);
    try {
      if (status === "authenticated" && sessionData) {
        const payload = {
          username: query_username,
          uid: sessionData.uid,
          tokenData: sessionData.token,
        };
        // Make sure userProfileData is asynchronous or returns a Promise
        userProfileData(payload)
          .then((apiData) => {
            setapiResponse(apiData);
          })
          .catch((error) => {
            throw new Error(error);
          });
      } else {
        const payload = {
          username: query_username,
          uid: null,
          tokenData: null,
        };
        userProfileData(payload)
          .then((apiData) => {
            setapiResponse(apiData);
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    } catch (error) {
      throw new Error(error);
    }

    console.log(apiResponse.status);
  }, [query_username, status, sessionData]);

  return (
    <section className="w-full bg-backgroundLight">
      <div className="max-w-[1280px] mx-auto p-4">
        {apiResponse.status === 404 ? (
          <div className="flex flex-col justify-center items-center">
            <div className="max-w-[500px] md:max-w-[750px]">
              <Lottie animationData={NotFound} />
            </div>
            <div className="text-textWhite text-3xl px-5 py-5 font-semibold font-poppins bg-backgroundDark rounded-lg">
              <h1 className="font-quantico">User Not Fond</h1>
            </div>
          </div>
        ) : (
          <div>Profile</div>
        )}
      </div>
    </section>
  );
};

export default Profile;

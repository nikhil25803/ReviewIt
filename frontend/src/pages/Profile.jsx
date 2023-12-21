import { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import NotFound from "../assets/animation/NotFound.json";
import { useNavigate, useParams } from "react-router-dom";
import { userAPIService } from "../apis/UserAPI";
import ContentLoader from "react-content-loader";
import Dashboard from "../components/userProfile/Dashboard";

const Profile = () => {
  // Getting path param (slug)
  const params = useParams();

  // Username
  const query_username = params.username;

  // State to store data
  const [userAvailable, setUserAvailable] = useState("checking");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async (payload) => {
    try {
      const response = await userAPIService.get("api/user/profile", {
        params: {
          username: payload.username,
        },
        headers: {
          Authorization: payload.tokenData,
          Uid: payload.uid,
          Username: payload.username,
        },
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

  useEffect(() => {
    // Get JWT Token from the Session
    const sessionObject = JSON.parse(localStorage.getItem("auth"));

    // Create a payload object
    let payload = new Object();

    // Populate token data based on some conditions
    if (sessionObject && sessionObject["token"]) {
      payload = {
        username: query_username,
        tokenData: sessionObject["token"],
        uid: sessionObject["uid"],
      };
    } else {
      payload = {
        username: query_username,
        uid: null,
        tokenData: null,
      };
    }

    // Make the API call for the payload
    fetchUserData(payload)
      .then((response) => {
        if (response.status == 404) {
          setUserAvailable("not-found");
        } else if (response.status == 200) {
          setUserAvailable("found");
        } else {
          navigate("/");
        }
        setUserData(response);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [params]);

  const renderComponent = () => {
    if (userAvailable == "checking") {
      return (
        <ContentLoader
          speed={2}
          width={500}
          height={160}
          viewBox="0 0 500 160"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
          <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
          <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
          <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
          <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
          <circle cx="20" cy="20" r="20" />
        </ContentLoader>
      );
    } else if (userAvailable === "not-found") {
      return (
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-[500px] md:max-w-[750px]">
            <Lottie animationData={NotFound} />
          </div>
          <div className="text-textWhite text-3xl px-5 py-5 font-semibold font-poppins bg-backgroundDark rounded-lg">
            <h1 className="font-quantico">User Not Found</h1>
          </div>
        </div>
      );
    } else if (
      userAvailable == "found" &&
      userData.message.split(" ")[1] == "profile"
    ) {
      return (
        <div>
          <div>Profile Data</div>
        </div>
      );
    } else if (
      userAvailable == "found" &&
      userData.message.split(" ")[1] == "dashboard"
    ) {
      return (
        <div>
          <Dashboard />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-[500px] md:max-w-[750px]">
            <Lottie animationData={NotFound} />
          </div>
          <div className="text-textWhite text-3xl px-5 py-5 font-semibold font-poppins bg-backgroundDark rounded-lg">
            <h1 className="font-quantico">User Not Found</h1>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="w-full bg-backgroundLight">
      <div className="max-w-[1280px] mx-auto p-4">{renderComponent()}</div>
    </section>
  );
};

export default Profile;

/*
export const userProfileData = async (payload) => {
  try {
    const response = await userAPIService.get("api/user/profile", {
      params: {
        username: payload.username,
      },
      headers: {
        Authorization: payload.tokenData,
        Uid: payload.uid,
        Username: payload.username,
      },
    });
    if (response && response.data) {
      return response.data; // Return the object directly
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};


{apiResponse && apiResponse.status === 404 ? (
          <div className="flex flex-col justify-center items-center">
            <div className="max-w-[500px] md:max-w-[750px]">
              <Lottie animationData={NotFound} />
            </div>
            <div className="text-textWhite text-3xl px-5 py-5 font-semibold font-poppins bg-backgroundDark rounded-lg">
              <h1 className="font-quantico">User Not Found</h1>
            </div>
          </div>
        ) : (
          <div>Profile</div>
        )}
*/

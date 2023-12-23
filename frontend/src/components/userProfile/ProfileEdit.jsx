import { useEffect, useState } from "react";
import { userAPIService } from "../../apis/UserAPI";
import GooglePendingAnimation from "../../assets/animation/GooglePendingAnimation.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
const ProfileEdit = (props) => {
  // Collecting the props
  const userData = props.props;

  // Manage form state
  const [formState, setFormState] = useState("nothing");
  const [sessionPayload, setSessionPayload] = useState({});

  // Navigate
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    linkedin: "",
    github: "",
    bio: "",
    about: "",
  });

  useEffect(() => {
    // Get JWT Token from the Session
    const sessionObject = JSON.parse(localStorage.getItem("auth"));

    let newSessionPayload;
    if (sessionObject && sessionObject["token"]) {
      newSessionPayload = {
        username: sessionObject["username"],
        tokenData: sessionObject["token"],
        uid: sessionObject["uid"],
      };
    } else {
      newSessionPayload = {
        username: query_username,
        uid: null,
        tokenData: null,
      };
    }

    setSessionPayload(newSessionPayload);
    setFormData({
      name: userData.name || "",
      linkedin: userData.linkedin || "",
      github: userData.github || "",
      bio: userData.bio || "",
      about: userData.about || "",
    });
  }, [userData]);

  // Handle Change
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to make API Calls
  const updateUserData = async (data, sessionToken) => {
    try {
      const response = await userAPIService.patch("api/user/profile", data, {
        params: {
          username: sessionToken.username,
        },
        headers: {
          Authorization: sessionToken.tokenData,
          Uid: sessionToken.uid,
          Username: sessionToken.username,
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

  // Handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // Set Form State to checking
    setFormState("checking");

    // Constructing the payload
    const payload = new Object();

    if (formData.name !== "") {
      payload.name = formData.name;
    }

    if (formData.linkedin !== "") {
      payload.linkedin = formData.linkedin;
    }

    if (formData.github !== "") {
      payload.github = formData.github;
    }

    if (formData.bio !== "") {
      payload.bio = formData.bio;
    }

    if (formData.about !== "") {
      payload.about = formData.about;
    }

    if (Object.keys(payload).length == 0) {
      setFormState("empty");

      return null;
    }

    try {
      // Make the API call for the payload
      updateUserData(payload, sessionPayload)
        .then((response) => {
          if (response.status == 400) {
            setFormState("empty");
            setTimeout(() => {
              window.location.reload();
            }, 3500);
          } else if (response.status == 200) {
            setFormState("success");
            setTimeout(() => {
              window.location.reload();
            }, 3500);
          } else {
            navigate(`/${userData.username}`);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="bg-backgroundDark p-4 mt-10 rounded-lg font-poppins">
      <div>
        <form
          className="mt-4 font-poppins text-sm font-semibold grid grid-cols-1 gap-5 items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="">
                <label
                  htmlFor="name"
                  className="block mb-2 text-textWhite font-quantico text-lg"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={userData.name || "Add/Update Name"}
                  id="name"
                  className=" text-textWhite rounded-lg  block w-full p-2.5 bg-backgroundLight text-base"
                  required=""
                />
              </div>
              <div className="">
                <label
                  htmlFor="linkedin"
                  className="block mb-2 text-textWhite font-quantico text-lg"
                >
                  LinkedIn
                </label>
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder={userData.linkedin || "Add/Update LinkedIn"}
                  className=" text-textWhite rounded-lg  block w-full p-2.5 bg-backgroundLight text-base"
                  required=""
                />
              </div>
              <div className="">
                <label
                  htmlFor="github"
                  className="block mb-2 text-textWhite font-quantico text-lg"
                >
                  GitHub
                </label>
                <input
                  type="text"
                  name="github"
                  id="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder={userData.github || "Add/Update GitHub"}
                  className=" text-textWhite rounded-lg  block w-full p-2.5 bg-backgroundLight text-base"
                  required=""
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-poppins">
              <div className="">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-textWhite font-quantico text-lg"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows="8"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder={userData.bio || "Add/Update Bio"}
                  className="block p-2.5 w-full text-textWhite  rounded-lg focus:ring-primary-500 bg-backgroundLight text-base"
                ></textarea>
              </div>
              <div className="">
                <label
                  htmlFor="about"
                  className="block mb-2 text-textWhite font-quantico text-lg"
                >
                  About
                </label>
                <textarea
                  id="about"
                  rows="8"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder={userData.about || "Add/Update About"}
                  className="block p-2.5 w-full text-textWhite  rounded-lg focus:ring-primary-500 bg-backgroundLight text-base"
                ></textarea>
              </div>
            </div>
          </div>
          {formState == "nothing" ? (
            <></>
          ) : formState == "checking" ? (
            <button className="bg-backgroundDark rounded-lg flex flex-row justify-center gap-2 items-center p-5">
              <div className="w-[50px] bg-backgroundLight rounded-full">
                <Lottie animationData={GooglePendingAnimation} />
              </div>
            </button>
          ) : formState == "empty" ? (
            <div className="text-textWhite text-lg font-semibold">
              <h1>
                No change in
                <span className="text-textLight "> form </span> data or Invalid
                request
              </h1>
            </div>
          ) : (
            <div className="text-textWhite text-lg font-semibold">
              <h1>
                Profile Update
                <span className="text-textLight "> successfull.</span>
              </h1>
            </div>
          )}
          <button
            className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal"
            type="submit"
          >
            <div className="text-textWhite text-lg font-semibold">
              <h1>
                Update
                <span className="text-textLight "> Profile </span>
              </h1>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;

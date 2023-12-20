import axios from "axios";

// Gloabl Base URl
const BASEURL = import.meta.env.VITE_BACKEND_BASEURL;

// Define an API Services
const userAPIService = axios.create({
  baseURL: BASEURL,
});

// Ping Test
export const pingTest = async () => {
  try {
    const response = await userAPIService.get("api/user/");
    return response;
  } catch (error) {
    throw error;
  }
};

/*
Login/Register User -> This returns JWT Token

Incoming Data Should Look Like
{
    "uid":"...",
    "username": "...",
    "email": "...",
    "name": "...",
    "avatar": "..."
}
*/
export const userAuthentication = async (incomingData) => {
  try {
    const apiCall = await userAPIService.post(
      "api/user/auth/",
      {
        uid: incomingData.uid,
        username: incomingData.username,
        email: incomingData.email,
        name: incomingData.name,
        avatar: incomingData.avatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (apiCall) {
      return apiCall.data;
    }
  } catch (error) {
    return null;
  }
};

/*
User Profile API Call
*/
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

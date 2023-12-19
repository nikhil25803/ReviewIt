import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { userAuthentication } from "../apis/UserAPI";

const logoutFirebase = async () => await auth.signOut();

const clearUserDetails = () => {
  localStorage.removeItem("auth");
};

const onAuthStateHasChanged = (setSession) => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      clearUserDetails();
      return setSession({ status: "not-authenticated", tokenData: null });
    }

    try {
      const authDetails = localStorage.getItem("auth");
      if (authDetails) {
        setSession({
          status: "authenticated",
          tokenData: authDetails,
        });
      } else {
        clearUserDetails();
        setSession({ status: "not-authenticated", tokenData: null });
      }
    } catch (error) {
      clearUserDetails();
      setSession({ status: "not-authenticated", tokenData: null });
    }
  });
};

const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState({
    status: "checking",
    tokenData: null,
  });

  useEffect(() => {
    onAuthStateHasChanged(setSession);
  }, []);

  const handleLogOut = async () => {
    logoutFirebase();
    clearUserDetails();
    setSession({
      status: "not-authenticated",
      tokenData: null,
    });
    navigate("/");
  };

  const handleLoginWithGoogle = async () => {
    setSession({ ...session, status: "checking" });

    try {
      const result = await signInWithPopup(auth, googleProvider);

      if (result && result.user) {
        const payload = {
          name: result.user.displayName,
          username: result.user.email.split("@")[0],
          email: result.user.email,
          avatar: result.user.photoURL,
          uid: result.user.uid,
        };

        const userAuthResponse = await userAuthentication(payload);

        if (userAuthResponse && userAuthResponse.token) {
          localStorage.setItem("auth", userAuthResponse.token);
          setSession({
            status: "authenticated",
            tokenData: userAuthResponse.token,
          });
          navigate("/");
        } else {
          throw new Error("Unable to obtain JWT token");
        }
      } else {
        throw new Error("Unable to register user");
      }
    } catch (error) {
      console.log(error.message);
      clearUserDetails();
      setSession({ status: "not-authenticated", tokenData: null });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...session,
        handleLoginWithGoogle,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

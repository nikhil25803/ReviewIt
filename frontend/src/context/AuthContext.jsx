import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

// Globally used function
const logoutFirebase = async () => await auth.signOut();

//  On auth state change
const onAuthStateHasChanged = (setSession) => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      localStorage.removeItem("userDetails"); // Remove stored user details
      return setSession({ status: "no-authenticated", userDetails: null });
    }

    const userDetails = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };

    localStorage.setItem("userDetails", JSON.stringify(userDetails)); // Store user details
    setSession({ status: "authenticated", userDetails });
  });
};

// Google Login
const googleProvider = new GoogleAuthProvider();

// Defining Auth Context
const AuthContext = createContext();

// Defining Auth Provider
const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userDetails, setUserDetails] = useState(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    return storedUserDetails ? JSON.parse(storedUserDetails) : undefined;
  });

  const navigate = useNavigate();

  // On auth-state change
  useEffect(() => {
    onAuthStateHasChanged(setSession);
  }, []);

  // Validate Auth
  useEffect(() => {
    validateAuth(userDetails);
  }, [userDetails]);

  // Handle LogOut
  const handleLogOut = async () => {
    logoutFirebase();
    setSession({
      userDetails: null,
      status: "not-authenticated",
    });
    navigate("/");
  };

  // Validate Auth
  const validateAuth = (userDetails) => {
    if (userDetails) {
      return setSession({
        userDetails,
        status: "authenticated",
      });
    }
    handleLogOut();
  };

  // Checking
  const checking = () =>
    setSession((prev) => ({ ...prev, status: "checking" }));

  // Handle Login with Google
  const handleLoginWithGoogle = async () => {
    checking();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      const displayName = result.user.displayName;
      const email = result.user.email;
      const photoUrl = result.user.photoURL;
      const uid = result.user.uid;
      setUserDetails({ displayName, email, photoUrl, uid });
      navigate("/");
    } catch (error) {
      console.log(error.message);
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

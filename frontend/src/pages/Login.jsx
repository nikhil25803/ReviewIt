import Lottie from "lottie-react";
import LoginAnimation from "../assets/animation/LoginAnimation.json";
import GoogleLogoAnimation from "../assets/animation/GoogleLogoAnimation.json";
import GooglePendingAnimation from "../assets/animation/GooglePendingAnimation.json";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLoginWithGoogle, status } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginPending, setLoginPending] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      navigate("/");
    }
  }, [status]);

  const userLogin = async () => {
    setLoginPending(true);
    await handleLoginWithGoogle();
    setLoginPending(false);
    navigate("/");
  };

  return (
    <section className="w-full bg-backgroundLight">
      <div className="max-w-[1280px] mx-auto py-4 flex flex-col justify-center items-center h-fit">
        <div className="">
          <Lottie animationData={LoginAnimation} loop={true} />
        </div>
        {loginPending == false ? (
          <button
            className="bg-backgroundDark rounded-lg flex flex-row justify-center gap-2 items-center p-5"
            onClick={userLogin}
          >
            <div className="w-[50px] bg-backgroundLight rounded-full">
              <Lottie animationData={GoogleLogoAnimation} />
            </div>
            <div className="text-textWhite text-xl font-semibold font-poppins">
              <h1>
                Authenticate With{" "}
                <span className="text-textLight ">Google</span>
              </h1>
            </div>
          </button>
        ) : (
          <button className="bg-backgroundDark rounded-lg flex flex-row justify-center gap-2 items-center p-5">
            <div className="w-[50px] bg-backgroundLight rounded-full">
              <Lottie animationData={GooglePendingAnimation} />
            </div>
          </button>
        )}
      </div>
    </section>
  );
};

export default Login;

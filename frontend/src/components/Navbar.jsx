import { useContext } from "react";
import { IoMdLogIn } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { handleLoginWithGoogle, status, handleLogOut } =
    useContext(AuthContext);
  return (
    <nav className="w-full bg-backgroundDark">
      <div className="max-w-[1280px] mx-auto flex flex-row justify-between  items-center p-4">
        <div className="font-medium">
          <h6 className="font-quantico text-textWhite text-4xl ">
            Review <span className="text-textLight">It.</span>
          </h6>
          <p className="text-textDark font-poppins font-semibold">
            An open-source resume reviewing platform.
          </p>
        </div>
        <div className="hidden sm:block">
          {status === "authenticated" ? (
            <button
              className="flex flex-row justify-center  items-center text-backgroundDark bg-buttonPrimary rounded-lg w-[200px] py-3 my-4 gap-4 hover:bg-backgroundDark hover:text-textWhite transition  duration-300"
              onClick={handleLogOut}
            >
              <div className="text-lg font-semibold font-poppins">Profile</div>
              <div className="text-4xl ">
                <IoMdLogIn />
              </div>
            </button>
          ) : (
            <button
              className="flex flex-row justify-center  items-center text-backgroundDark bg-buttonPrimary rounded-lg w-[200px] py-3 my-4 gap-4 hover:bg-backgroundDark hover:text-textWhite transition  duration-300"
              onClick={handleLoginWithGoogle}
            >
              <div className="text-lg font-semibold font-poppins">Login</div>
              <div className="text-4xl ">
                <IoMdLogIn />
              </div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

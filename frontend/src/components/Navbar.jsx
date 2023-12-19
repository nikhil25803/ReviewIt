import { IoMdLogIn } from "react-icons/io";

const Navbar = () => {
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
          <div className="flex flex-row justify-center  items-center text-backgroundDark bg-buttonPrimary rounded-lg w-[200px] py-3 my-4 gap-4 hover:bg-backgroundDark hover:text-textWhite transition  duration-300">
            <div className="text-lg font-semibold font-poppins">Login</div>
            <div className="text-4xl ">
              <IoMdLogIn />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

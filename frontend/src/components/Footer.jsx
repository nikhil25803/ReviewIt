import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full bg-backgroundDark">
      <div className="max-w-[1280px] mx-auto flex flex-row justify-between items-center p-4 py-10">
        <div className="flex flex-col gap-5 mx-auto md:mx-0">
          <h1 className="text-3xl text-textWhite font-semibold font-quantico mx-6 md:mx-0">
            Made by <span className="text-textLight">Nikhil Raj</span>
          </h1>
          <div className="text-textWhite flex flex-row mt-3 justify-between items-center text-2xl gap-8 bg-backgroundLight h-10 py-8 px-8 rounded-lg hover:scale-105 duration-300">
            <a
              className="hover:text-textLight duration-200"
              style={{ cursor: "pointer" }}
              href="https://www.linkedin.com/in/nikhil25803/"
              target="_blank"
            >
              <BsLinkedin />
            </a>
            <a
              className="hover:text-textLight duration-200"
              style={{ cursor: "pointer" }}
              href="https://github.com/nikhil25803"
              target="_blank"
            >
              <BsGithub />
            </a>
            <a
              className="hover:text-textLight duration-200"
              style={{ cursor: "pointer" }}
              href="https://twitter.com/humans_write"
              target="_blank"
            >
              <BsTwitter />
            </a>
          </div>
          <div className="bg-backgroundLight flex flex-row justify-between items-center gap-8 py-8 px-8 rounded-lg hover:scale-105 duration-300 text-white">
            <a
              className="hover:text-textLight duration-200 text-3xl"
              style={{ cursor: "pointer" }}
              href="https://github.com/nikhil25803/ReviewIt"
              target="_blank"
            >
              <BsGithub />
            </a>
            <div className="text-right">
              <p className="text-textLight font-quantico text-xl">
                Project Link
              </p>
              <p className="font-poppins">Give this project a star</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl text-textWhite font-quantico">
              Reach out to <span className="text-textLight">us</span>
            </h1>
            <form className="flex flex-col w-[300px] gap-2">
              <input
                className="shadow  bg-backgroundLight rounded w-full py-2 px-3 text-textWhite leading-tight focus:outline-none focus:shadow-outline font-poppins"
                type="email"
                placeholder="Your Email ..."
              />
              <textarea
                type="text"
                className="shadow bg-backgroundLight rounded w-full px-3 py-10 text-textWhite leading-tight focus:outline-none focus:shadow-outline font-poppins"
                placeholder="Your Message ..."
              />
            </form>
            <button className="bg-buttons w-full font-poppins font-bold rounded-md text-backgroundDark bg-buttonPrimary  p-2 hover:bg-backgroundDark hover:text-textWhite transition  duration-300 ">
              Send
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

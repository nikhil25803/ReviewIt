import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import StatisticsCard from "../StatisticsCard";
import GooglePendingAnimation from "../../assets/animation/GooglePendingAnimation.json";
import GoogleLogoAnimation from "../../assets/animation/GoogleLogoAnimation.json";
import Lottie from "lottie-react";

// React Component
const Dashboard = (props) => {
  const dashboardData = props.props.data;

  return (
    <div className="text-white flex flex-col justify-center items-center h-fit">
      <div className="bg-backgroundDark p-4 w-full mx-auto rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-start md:items-center ">
        <div className="flex flex-col justify-center items-center  p-4 rounded-lg gap-5">
          <div className="">
            <img
              className="rounded-full "
              src={
                dashboardData.avatar
                  ? dashboardData.avatar
                  : "https://lh3.googleusercontent.com/a/ACg8ocJ-WWqNiQv0BppwWISN_SyIT6Xk3pPNVefijlfE7Hbc=s96-c"
              }
            />
          </div>
          <div className=" p-4 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-2xl text-textLight font-quantico">
              {dashboardData.name}
            </h1>
            <h1 className="text-slate-500">/{dashboardData.username}</h1>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="p-4 w-full flex flex-row items-center justify-center md:justify-start gap-10 text-xl hover:scale-105 duration-300">
            <div className="hover:text-textLight duration-200 flex flex-row items-center justify-center gap-2">
              <BsLinkedin />
              <a
                className="text-white font-quantico"
                href={dashboardData.linkedin ? dashboardData.linkedin : "#"}
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
            <div className="hover:text-textLight duration-200 flex flex-row items-center justify-center gap-2">
              <BsGithub />
              <a
                className="text-white font-quantico"
                href={dashboardData.github ? dashboardData.github : "#"}
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="text-2xl font-quantico text-textLight">Bio</div>
            <p className="bg-backgroundLight font-poppins rounded-lg font-medium p-4 text-base hover:scale-105 duration-300">
              {dashboardData.bio ? dashboardData.bio : "..."}
            </p>
          </div>
        </div>
      </div>
      {/* Second Div  */}
      <div className="bg-backgroundDark p-6 mt-4 w-full mx-auto rounded-lg grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4 h-fit ">
        <div className="bg-backgroundLight p-4 rounded-lg text-2xl font-quantico text-textWhite ">
          About <span className="text-textLight">...</span>
          <p className=" text-base text-textWhite font-poppins font-medium ">
            {dashboardData.about ? dashboardData.about : "..."}
          </p>
        </div>
        <div className="bg-backgroundLight p-4 rounded-lg text-2xl font-quantico text-textWhite flex flex-col gap-4">
          <div>
            Stats <span className="text-textLight">...</span>
          </div>
          <div>
            <StatisticsCard number={100} title={"Requests Received"} />
          </div>
          <div>
            <StatisticsCard number={100} title={"Reviews Submitted"} />
          </div>
        </div>
      </div>
      {/* Third Div  */}
      <div className="bg-backgroundDark p-6 mt-10 w-full rounded-lg  font-quantico">
        <div className="grid grid-cols-1 justify-center items-center gap-10">
          <div className="flex flex-col justify-center">
            <div className="text-2xl">Want you resume to get reviewed?</div>
            <form
              action="#"
              className="mt-4 font-poppins text-sm font-semibold grid grid-cols-1 md:grid-cols-2 gap-5 items-center"
            >
              <div className="flex flex-col gap-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-textWhite">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className=" text-textWhite rounded-lg  block w-full p-2.5 bg-backgroundLight text-base"
                    placeholder="Type product name"
                    required=""
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-textWhite dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="8"
                    className="block p-2.5 w-full text-textWhite  rounded-lg focus:ring-primary-500 bg-backgroundLight text-base"
                    placeholder="Your description here"
                  ></textarea>
                </div>

                <div>
                  <label
                    className="block mb-2 text-gray-900 dark:text-white"
                    htmlFor="user_avatar"
                  >
                    Upload file
                  </label>
                  <input
                    className="block w-full bg-backgroundLight p-2.5  rounded-lg cursor-pointer "
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                  />
                </div>
              </div>
              <button className="bg-backgroundLight w-full mt-5 rounded-lg flex flex-row justify-center gap-2 items-center p-2 h-fit font-quantico font-normal">
                <div className="w-[50px] bg-backgroundLight rounded-full">
                  <Lottie animationData={GoogleLogoAnimation} />
                </div>
                <div className="text-textWhite text-lg font-semibold">
                  <h1>
                    Validate with
                    <span className="text-textLight "> Google </span> and
                    Submit.
                  </h1>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

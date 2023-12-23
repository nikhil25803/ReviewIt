import React, { useState } from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import StatisticsCard from "../StatisticsCard";
const ProfileDashboard = (props) => {
  // Getting Props data
  const dashboardData = props.props;

  // Some state to render
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [requestPending, setRequestPending] = useState(0);
  const [requestCompleted, setRequestCompleted] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Calculate total submission - total requests
  useState(() => {
    // Calculate total submissions (total requests)
    const submissions = dashboardData.requests.length;
    setTotalSubmissions(submissions);

    // Calculate pending and completed requests
    let pending = 0;
    let completed = 0;
    dashboardData.requests.forEach((request) => {
      if (request.responded) {
        completed++;
      } else {
        pending++;
      }
    });
    setRequestPending(pending);
    setRequestCompleted(completed);

    // Calculate total reviews
    const reviews = dashboardData.response.length;
    setTotalReviews(reviews);
  }, []);

  console.log(totalSubmissions, requestPending, requestCompleted, totalReviews);

  return (
    <div className="text-white flex flex-col justify-center items-center h-fit mt-10">
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
      <div className="bg-backgroundDark p-6 mt-4 w-full mx-auto rounded-lg  h-fit ">
        <div className="bg-backgroundLight p-4 rounded-lg text-2xl font-quantico text-textWhite ">
          About <span className="text-textLight">...</span>
          <p className=" text-base text-textWhite font-poppins font-medium ">
            {dashboardData.about ? dashboardData.about : "..."}
          </p>
        </div>
      </div>
      {/* Third Div  */}
      <div className="bg-backgroundDark p-6 mt-10 w-full rounded-lg  font-quantico flex flex-col gap-5 justify-center items-center">
        <div className="text-2xl mx-0">
          Your statistics <span className="text-textLight">...</span>
        </div>
        <div className="bg-backgroundLight grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg text-2xl font-quantico text-textWhite ">
          <div>
            <StatisticsCard
              number={totalSubmissions}
              title={"Total Submissions"}
            />
          </div>
          <div>
            <StatisticsCard
              number={requestPending}
              title={"Requests Pending"}
            />
          </div>
          <div>
            <StatisticsCard
              number={requestCompleted}
              title={"Request Completed"}
            />
          </div>
          <div>
            <StatisticsCard number={totalReviews} title={"Total Reviews"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;

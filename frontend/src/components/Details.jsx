import React from "react";
import DetailCard from "./DetailCard";
import { FaUserCheck } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { FaUsersViewfinder } from "react-icons/fa6";

const Details = () => {
  return (
    <section className="w-full bg-backgroundDark text-textWhite">
      <div className="max-w-[1280px] mx-auto flex flex-col p-4 h-fit py-10">
        <div className="mr-auto text-3xl md:text-4xl font-quantico py-10">
          Get Started <span className="text-textLight">...</span>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-10 mx-auto">
          <DetailCard
            title={"Authenticate"}
            text={
              "Begin by signing in securely with Google, creating a unified profile for a streamlined experience, whether you're seeking mentorship or offering guidance."
            }
            icons={<FaUserCheck />}
          />
          <DetailCard
            title={"Upload"}
            text={
              "You can request mentorship once every seven days for a specific mentor. This approach ensures quality interactions and focused guidance tailored to your professional development."
            }
            icons={<MdDocumentScanner />}
          />
          <DetailCard
            title={"Request"}
            text={
              "Send personalized mentorship requests to our global network of mentors by uploaded your desired resumes to get reviewed and articulate your career goals or specific job aspirations in your message."
            }
            icons={<FaUsersViewfinder />}
          />
        </div>
      </div>
    </section>
  );
};

export default Details;

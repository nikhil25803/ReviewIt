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
              "Securely connect via Google or Github to establish your profile. This unified profile ensures a seamless experience, serving you both in resume review and mentorship request scenarios."
            }
            icons={<FaUserCheck />}
          />
          <DetailCard
            title={"Upload"}
            text={
              "Effortlessly upload up to three resumes, each with distinct aliases (e.g., SDE, ML). When requesting a review, select the relevant resume, tailoring your approach to diverse opportunities."
            }
            icons={<MdDocumentScanner />}
          />
          <DetailCard
            title={"Request"}
            text={
              "Initiate mentorship by sending personalized requests to global mentors. Choose from your uploaded resumes and include a message detailing your job requirements or specific career aspirations."
            }
            icons={<FaUsersViewfinder />}
          />
        </div>
      </div>
    </section>
  );
};

export default Details;

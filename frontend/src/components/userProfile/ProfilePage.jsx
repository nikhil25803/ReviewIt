import React, { useState } from "react";
import ProfileDashboard from "./ProfileDashboard";
import ProfileRequests from "./ProfileRequests";
import ProfileResponse from "./ProfileResponse";

const ProfilePage = (props) => {
  // Getting props data
  const profileData = props.props.data;

  // State to handle pages
  const [activePage, setActivePage] = useState("dashboard");

  // Render Dashboard Page
  const renderDashboardPage = () => {
    setActivePage("dashboard");
  };

  // Render Requests Page
  const renderRequestPage = () => {
    setActivePage("requests");
  };

  // Render Response Page
  const renderResponsePage = () => {
    setActivePage("response");
  };

  // Render Response Page
  const renderEditPage = () => {
    setActivePage("edit");
  };

  return (
    <div className="">
      <div className="bg-backgroundDark rounded-lg text-white font-quantico p-4">
        <div className="flex flow-row  justify-evenly items-center text-lg">
          <button
            className={
              activePage == "dashboard"
                ? "bg-backgroundLight px-3 py-3 rounded-lg"
                : "bg-backgroundDark px-3 py-3 rounded-lg"
            }
            onClick={renderDashboardPage}
          >
            Dashboard
          </button>
          <button
            className={
              activePage == "requests"
                ? "bg-backgroundLight px-3 py-3 rounded-lg"
                : "bg-backgroundDark px-3 py-3 rounded-lg"
            }
            onClick={renderRequestPage}
          >
            Requests
          </button>
          <button
            className={
              activePage == "response"
                ? "bg-backgroundLight px-3 py-3 rounded-lg"
                : "bg-backgroundDark px-3 py-3 rounded-lg"
            }
            onClick={renderResponsePage}
          >
            Response
          </button>
          <button
            className={
              activePage == "edit"
                ? "bg-backgroundLight px-3 py-3 rounded-lg"
                : "bg-backgroundDark px-3 py-3 rounded-lg"
            }
            onClick={renderEditPage}
          >
            Edit
          </button>
        </div>
      </div>
      <div>
        {activePage == "dashboard" ? (
          <div>
            <ProfileDashboard props={profileData} />
          </div>
        ) : activePage == "requests" ? (
          <div>
            <ProfileRequests />
          </div>
        ) : activePage == "response" ? (
          <div>
            <ProfileResponse />
          </div>
        ) : activePage == "edit" ? (
          <div>Edit Page</div>
        ) : (
          <div>Invalid</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

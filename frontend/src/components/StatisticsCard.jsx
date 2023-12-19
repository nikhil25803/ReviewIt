import React from "react";

const StatisticsCard = ({ number, title }) => {
  return (
    <div className="bg-backgroundDark flex flex-row justify-between items-center w-full shadow-xl p-5 rounded-lg hover:scale-105 duration-300 font-medium">
      <div className="text-textWhite bg-backgroundLight rounded-full p-7 text-2xl border-r-2 border-textLight">
        {number}
      </div>
      <h1 className="text-2xl text-textWhite font-quantico">{title}</h1>
    </div>
  );
};

export default StatisticsCard;

import React from "react";

const StatisticsCard = ({ number, title }) => {
  return (
    <div className="bg-backgroundDark flex flex-col sm:flex-row justify-between items-center gap-2 w-full shadow-xl p-5 rounded-lg hover:scale-105 duration-300 font-medium">
      <div className="text-textWhite bg-backgroundLight rounded-full p-7 text-2xl border-r-2 border-textLight mb-4 sm:mb-0 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {number}
      </div>
      <h1 className="text-2xl text-textWhite font-quantico whitespace-nowrap overflow-hidden overflow-ellipsis">
        {title}
      </h1>
    </div>
  );
};

export default StatisticsCard;

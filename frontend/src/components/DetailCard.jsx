import React from "react";

const DetailCard = ({ title, text, icons }) => {
  return (
    <div className="bg-backgroundLight flex flex-col justify-center gap-6  items-center w-full shadow-xl p-5 rounded-lg hover:scale-105 duration-300 font-medium">
      <div className="text-textWhite text-4xl md:text-5xl ">{icons}</div>
      <h1 className="text-xl md:text-2xl text-textLight font-quantico">
        {title}
      </h1>
      <p className=" bg-backgroundDark rounded-xl text-base md:text-lg p-5 text-center font-poppins h-full">
        {text}
      </p>
    </div>
  );
};

export default DetailCard;

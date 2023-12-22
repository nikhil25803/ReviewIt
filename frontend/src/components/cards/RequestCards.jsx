import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const RequestCards = () => {
  return (
    <div className="bg-backgroundLight p-4 w-full mx-auto font-poppins rounded-lg">
      <div className="flex flex-col gap-5 justify-between items-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 justify-start items-center">
            <img src="#" alt="image" />
            <div className="flex flex-col justify-center items-start">
              <h1 className="font-quantico text-xl">Name</h1>
              <p className="text-slate-500">Email</p>
            </div>
          </div>
          <div>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Officiis, nemo iusto pariatur explicabo error fuga, illum quo ea
              incidunt ducimus est earum rem. Eveniet excepturi dolorum ut
              voluptatibus commodi iste dicta necessitatibus cum, mollitia optio
              voluptatum eius, officiis architecto id.
              {/* if (container.innerText.length > 50) {
    container.innerText = container.innerText.substring(0, 50) + '...';
  } */}
            </div>
          </div>
        </div>
        <div className="border-t-2 p-2">
          <button className="flex flex-row justify-center items-center text-l font-quantico gap-5 bg-backgroundDark p-4 rounded-lg hover:scale-105 duration-300">
            Submit a Review{" "}
            <span className="text-textLight">
              <FaAngleDoubleRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCards;

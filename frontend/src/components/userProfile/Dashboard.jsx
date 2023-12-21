import React from "react";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";
import StatisticsCard from "../StatisticsCard";
const Dashboard = () => {
  //   const dashboardData = props.data;
  return (
    <div className="text-white flex flex-col justify-center items-center h-fit">
      <div className="bg-backgroundDark p-4 w-full mx-auto rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-start md:items-center ">
        <div className="flex flex-col justify-center items-center  p-4 rounded-lg gap-5">
          <div className="">
            <img
              className="rounded-full "
              src="https://lh3.googleusercontent.com/a/ACg8ocJ-WWqNiQv0BppwWISN_SyIT6Xk3pPNVefijlfE7Hbc=s96-c"
            />
          </div>
          <div className=" p-4 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-2xl text-textLight font-quantico">
              Anil Kumar Singh
            </h1>
            <h1 className="text-slate-500">/anil_kumar_singh</h1>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="p-4 w-full flex flex-row items-center justify-center md:justify-start gap-10 text-xl hover:scale-105 duration-300">
            <div className="hover:text-textLight duration-200 flex flex-row items-center justify-center gap-2">
              <BsLinkedin />
              <h1 className="text-white font-quantico">LinkedIn</h1>
            </div>
            <div className="hover:text-textLight duration-200 flex flex-row items-center justify-center gap-2">
              <BsGithub />
              <h1 className="text-white font-quantico">GitHub</h1>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="text-2xl font-quantico text-textLight">Bio</div>
            <p className="bg-backgroundLight font-poppins rounded-lg font-medium p-4 text-base hover:scale-105 duration-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ex
              a tenetur exercitationem fuga consequatur vel eius placeat modi
              deleniti possimus neque hic, optio cupiditate aut culpa excepturi!
              Distinctio soluta error assumenda quod minus in aut animi eligendi
              doloribus facilis omnis ipsa aliquid suscipit, nisi hic. Culpa
              deserunt dignissimos dolorem.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-backgroundDark p-6 mt-4 w-full mx-auto rounded-lg grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4 h-fit ">
        <div className="bg-backgroundLight p-4 rounded-lg text-2xl font-quantico text-textWhite ">
          About <span className="text-textLight">...</span>
          <p className=" text-base text-textWhite font-poppins font-medium ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            omnis ipsa. Repudiandae deleniti fuga illum labore est ipsum
            assumenda repellat error tempora soluta dolores ad, suscipit tenetur
            quis consequuntur eius! Earum veniam et voluptas alias non iste
            sequi ut possimus dicta porro? Provident assumenda est nulla nam,
            itaque animi dolorem quae voluptatum laborum nobis placeat ducimus
            recusandae autem natus neque mollitia earum ut non eveniet numquam
            aspernatur minus, at fugit esse? Eius rem incidunt obcaecati, sequi
            animi vel ad quae quo corporis delectus tempore, dolorum recusandae
            perspiciatis praesentium assumenda iste rerum ipsam debitis quaerat.
            Provident eveniet molestias excepturi facilis reprehenderit.
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
    </div>
  );
};

export default Dashboard;

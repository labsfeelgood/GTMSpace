
import React from "react";
import logo from "../assets/images/logo.png";

const MobileApp = () => {
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className=" flex flex-col gap-10  text-center">
        <img src={logo} alt="" className="mx-auto max-w-[90%]" />
        <p className="text-white text-[1rem] sm:text-[1.5rem] mx-4 ">
          Not optimized for mobile, please visit on desktop
        </p>
      </div>
    </div>
  );
};

export default MobileApp;


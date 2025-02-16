import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import { IoMdCash } from "react-icons/io";

const WaitForDriver = ({
  ride,
  setWaitingForDriver,
  waitingForDriver,
  vehicleImg,
}) => {
  return (
    <>
      {" "}
      <h5
        className={
          waitingForDriver
            ? "p-1 flex items-center justify-center pt-3 text-3xl w-[93%] absolute top-0 opacity-1"
            : "opacity-1"
        }
        onClick={() => {
          setWaitingForDriver(false);
        }}
      >
        <RiArrowDownWideLine />
      </h5>
      <div className="flex items-center justify-between">
        <img className="h-14" src={vehicleImg} alt="" />
        <div className="text-right">
          <h2 className="text-lg font-medium">
            {ride?.captain?.fullname?.firstname +
              " " +
              ride?.captain?.fullname?.lastname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {ride?.vehicle?.plate}
          </h4>
          <p className="text-sm text-gray-600">Tata Nexas</p>
          <h1 className="text-lg font-semibold">{ride?.otp}</h1>
        </div>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center ">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <span className="text-2xl">
              <ImLocation />
            </span>
            <div>
              <h3 className="text-lg font-medium">532/11-A</h3>
              <p className="text-base text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <span className="text-2xl">
              <ImLocation2 />
            </span>
            <div>
              <h3 className="text-lg font-medium">532/11-A</h3>
              <p className="text-base text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <span className="text-2xl">
              <IoMdCash />
            </span>
            <div>
              <h3 className="text-lg font-medium">Rs: {ride?.fare}</h3>
              <p className="text-base text-gray-600">Cash-cash</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitForDriver;

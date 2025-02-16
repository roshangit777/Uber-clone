import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import { IoMdCash } from "react-icons/io";

const LookingForDriver = ({
  setVehicalFound,
  vehicleImg,
  vehicleFound,
  pickup,
  destination,
  vehicleType,
  data,
}) => {
  return (
    <>
      <h5
        className={
          vehicleFound
            ? "p-1 flex items-center justify-center pt-3 text-3xl w-[93%] absolute top-0 opacity-1"
            : "opacity-0"
        }
        onClick={() => {
          setVehicalFound(false);
        }}
      >
        <RiArrowDownWideLine />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking For A Driver</h3>
      <div className="flex gap-2 justify-between flex-col items-center ">
        <img className="h-20 " src={vehicleImg} alt="" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <span className="text-2xl">
              <ImLocation />
            </span>
            <div>
              <h3 className="text-lg font-medium">532/11-A</h3>
              <p className="text-base text-gray-600">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <span className="text-2xl">
              <ImLocation2 />
            </span>
            <div>
              <h3 className="text-lg font-medium">532/11-A</h3>
              <p className="text-base text-gray-600">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <span className="text-2xl">
              <IoMdCash />
            </span>
            <div>
              <h3 className="text-lg font-medium">Rs {data[vehicleType]}</h3>
              <p className="text-base text-gray-600">Cash-cash</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LookingForDriver;

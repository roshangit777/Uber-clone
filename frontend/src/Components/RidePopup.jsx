import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import { IoMdCash } from "react-icons/io";
const RidePopup = ({
  ride,
  confirmRide,
  ridePopup,
  setRidePopup,
  setConfirmRidePopup,
}) => {
  return (
    <>
      <h5
        className={
          ridePopup
            ? "p-1 flex items-center justify-center pt-3 text-3xl w-[93%] absolute top-0 opacity-1"
            : "opacity-0"
        }
        onClick={() => setRidePopup(false)}
      >
        <RiArrowDownWideLine />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available</h3>
      <div className="flex justify-between items-center mt-4 bg-yellow-400 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/originals/40/3e/6c/403e6c37a2276d7d7b13d57375aa7ce9.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {ride?.user?.fullname?.firstname +
              " " +
              ride?.user?.fullname?.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center ">
        {/* <img
          className="h-20 "
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        /> */}
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
        <button
          onClick={() => {
            confirmRide();
            setRidePopup(false);
            setConfirmRidePopup(true);
          }}
          className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5"
        >
          Accept
        </button>
        <button
          onClick={() => {
            setRidePopup(false);
          }}
          className="w-full bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg mt-1"
        >
          Diclain
        </button>
      </div>
    </>
  );
};

export default RidePopup;

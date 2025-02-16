import React, { useContext, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { IoMdCash } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../Components/LiveTracking";

const Riding = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();
  const rideData = location.state;
  console.log("hi");
  socket.on("end-ride", (ride) => {
    console.log(ride);
    navigate("/home");
  });

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <span className="text-3xl font-medium">
          <AiOutlineHome />
        </span>
      </Link>
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-14"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">
              {rideData?.ride?.captain?.fullname?.firstname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {rideData?.ride?.vehicle}
            </h4>
            <p className="text-sm text-gray-600">
              {rideData?.ride?.captain?.vehicle?.plate}
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col items-center ">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <span className="text-2xl">
                <ImLocation2 />
              </span>
              <div>
                <h3 className="text-lg font-medium">532/11-A</h3>
                <p className="text-base text-gray-600">
                  {rideData?.ride?.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <span className="text-2xl">
                <IoMdCash />
              </span>
              <div>
                <h3 className="text-lg font-medium">
                  Rs: {rideData?.ride?.fare}
                </h3>
                <p className="text-base text-gray-600">Cash-cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;

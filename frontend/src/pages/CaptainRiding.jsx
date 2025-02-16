import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { RiArrowDownWideLine } from "react-icons/ri";
import { BsChevronCompactUp } from "react-icons/bs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import RidePopup from "../Components/RidePopup";
import FinishRide from "../Components/FinishRide";
import LiveTracking from "../Components/LiveTracking";

const CaptainRiding = () => {
  const [finidhRidePopup, setFinishRidePopup] = useState(false);
  const finishRideRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  console.log(rideData);

  useGSAP(
    function () {
      if (finidhRidePopup) {
        gsap.to(finishRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finidhRidePopup]
  );
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://static.vecteezy.com/system/resources/previews/027/127/594/original/uber-logo-uber-icon-transparent-free-png.png"
          alt=""
        />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <span className="text-3xl font-medium">
            <MdOutlineLogout />
          </span>
        </Link>
      </div>
      <div className="h-4/5">
        <LiveTracking />
      </div>

      <div
        className="flex h-1/5 p-6 bg-yellow-400 justify-between items-center relative"
        onClick={() => setFinishRidePopup(true)}
      >
        <h5
          className={
            finidhRidePopup
              ? "p-1 flex items-center absolute justify-center pt-3 text-3xl w-[80%] top-0 opacity-1"
              : "p-1 flex items-center absolute justify-center pt-3 text-3xl w-[80%] top-0 opacity-1"
          }
        >
          {finidhRidePopup ? <RiArrowDownWideLine /> : <BsChevronCompactUp />}
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className=" bg-green-600 text-white font-semibold p-3 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRideRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-14 bg-white translate-y-full"
      >
        <FinishRide ride={rideData} setFinishRidePopup={setFinishRidePopup} />
      </div>
    </div>
  );
};

export default CaptainRiding;

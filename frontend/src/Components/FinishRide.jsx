import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import { IoMdCash } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const FinishRide = (props) => {
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/rides/end-ride",
        {
          rideId: props.ride?._id,
        }
      );

      if (response.status === 200) {
        console.log("done");
        navigate("/captain-home");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h5
        className={
          true
            ? "p-1 flex items-center justify-center pt-3 text-3xl w-[93%] absolute top-0 opacity-1"
            : "p-1 flex items-center justify-center pt-3 text-3xl w-[93%] absolute top-0 opacity-1"
        }
        onClick={() => props.setFinishRidePopup(false)}
      >
        <RiArrowDownWideLine />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>
      <div className="flex justify-between items-center border-2 mt-4 border-yellow-400 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/originals/40/3e/6c/403e6c37a2276d7d7b13d57375aa7ce9.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname}
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
              <p className="text-base text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <span className="text-2xl">
              <ImLocation2 />
            </span>
            <div>
              <h3 className="text-lg font-medium">532/11-A</h3>
              <p className="text-base text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <span className="text-2xl">
              <IoMdCash />
            </span>
            <div>
              <h3 className="text-lg font-medium">Rs: {props.ride?.fare}</h3>
              <p className="text-base text-gray-600">Cash-cash</p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-[90%]">
          <form
            className="flex justify-between flex-col gap-2 w-full items-center"
            onSubmit={(e) => handlesubmit(e)}
          >
            <button
              type="submit"
              /* onClick={() => {
        setVehicalFound(true);
        setConfirmRidePanel(false);
      }} */
              className="w-full bg-green-600 text-lg flex justify-center text-white font-semibold p-2 rounded-lg "
            >
              Finish Ride
            </button>
            <p className="text-red-500 mt-10 text-xm">
              Click on finish ride button if you have completed the payment.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default FinishRide;

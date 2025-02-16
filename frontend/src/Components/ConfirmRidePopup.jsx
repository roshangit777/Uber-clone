import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { ImLocation2 } from "react-icons/im";
import { IoMdCash } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopup = ({
  ride,
  setRidePopup,
  confirmRidePopup,
  setConfirmRidePopup,
}) => {
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/rides/start-ride",
      {
        rideId: ride._id,
        otp: otp,
      }
    );
    if (response.status === 200) {
      setConfirmRidePopup(false);
      navigate("/captain-riding", { state: { ride: ride } });
    }
  };
  return (
    <>
      <h5
        className={
          confirmRidePopup
            ? "p-1 flex items-center justify-center pt-3 text-3xl w-[93%] absolute top-0 opacity-1"
            : "opacity-0"
        }
        onClick={() => setConfirmRidePopup(false)}
      >
        <RiArrowDownWideLine />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this Ride to Start
      </h3>
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
        <div className="mt-5 w-[90%]">
          <form
            className="flex justify-between flex-col gap-2 w-full items-center"
            onSubmit={(e) => submitHandler(e)}
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-2 rounded-lg border-2 border-gray-300 text-center font-mono"
            />
            <button
              type="submit"
              /* onClick={() => {
            setVehicalFound(true);
            setConfirmRidePanel(false);
          }} */
              className="w-full bg-green-600 text-lg flex justify-center text-white font-semibold p-2 rounded-lg "
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setRidePopup(false);
                setConfirmRidePopup(false);
              }}
              className="w-full bg-gray-300 text-lg text-gray-700 font-semibold p-2 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmRidePopup;

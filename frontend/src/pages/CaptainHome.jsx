import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopup from "../Components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../Components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../Components/LiveTracking";

const CaptainHome = () => {
  const [ridePopup, setRidePopup] = useState(false);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    socket.on("new-ride", (data) => {
      console.log(data);
      setRidePopup(true);
      setRide(data);
    });

    const updateLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log({
            captainId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const locationInterval = setInterval(updateLocation, 5000);
    updateLocation();
    return () => clearInterval(locationInterval);

    /*  const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log({
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });

          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.log("Error while getting the current location", error);
        }
      ); */
  }, [socket]);

  useGSAP(
    function () {
      if (ridePopup) {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopup]
  );
  useGSAP(
    function () {
      if (confirmRidePopup) {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopup]
  );

  const confirmRide = async () => {
    const response = await axios.post("http://localhost:5000/rides/confirm", {
      rideId: ride._id,
      captainId: captain._id,
    });
  };
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
      <div className="h-3/5">
        {/* <img
          className="h-full w-full object-cover"
          src="https://th.bing.com/th/id/OIP.yvauclQ-ruJZlVLQBwSYPAHaHa?rs=1&pid=ImgDetMain"
          alt=""
        /> */}
        <LiveTracking />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-14 bg-white translate-y-full"
      >
        <RidePopup
          ride={ride}
          ridePopup={ridePopup}
          setRidePopup={setRidePopup}
          setConfirmRidePopup={setConfirmRidePopup}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupRef}
        className="fixed w-full z-10 h-screen bottom-0 px-3 py-6 pt-14 bg-white translate-y-full"
      >
        <ConfirmRidePopup
          ride={ride}
          confirmRidePopup={confirmRidePopup}
          setRidePopup={setRidePopup}
          setConfirmRidePopup={setConfirmRidePopup}
        />
      </div>
    </div>
  );
};

export default CaptainHome;

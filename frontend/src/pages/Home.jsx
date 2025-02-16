import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiArrowDownWideLine } from "react-icons/ri";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import WaitForDriver from "../Components/WaitForDriver";
import LookingForDriver from "../Components/LookingForDriver";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../Components/LiveTracking";
const Home = () => {
  const {
    user,
    pickup,
    destination,
    handlePickupChange,
    handleDestinationChange,
    setFocusedField,
  } = useContext(UserDataContext);
  const [panelOpen, setPanelOpen] = useState(false);
  const panalRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confiremRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicalFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [vehiclesFares, setVehicalsFares] = useState({});
  const [vehicleType, setVehicalType] = useState("");
  const [vehicleImg, setVehicalImg] = useState("");
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join", {
      userType: "user",
      userId: localStorage.getItem("user-data"),
    });

    socket.on("ride-confirmed", (ride) => {
      console.log(ride);
      setRide(ride);
      setVehicalFound(false);
      setWaitingForDriver(true);
    });

    socket.on("ride-started", (ride) => {
      console.log(ride);
      setWaitingForDriver(false);
      navigate("/riding", { state: { ride: ride } });
    });
  }, [socket]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panalRef.current, {
          height: "70%",
          padding: 24,
        });
      } else {
        gsap.to(panalRef.current, {
          height: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confiremRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confiremRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  const handleFindTrip = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/rides/getallfares`,
        {
          params: { pickup, destination },
        }
      );
      console.log(response.data.fares);
      setVehicalsFares(response.data.fares);
      setVehiclePanel(true);
      setPanelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createRide = async (type) => {
    try {
      const userId = localStorage.getItem("user-data");
      const response = await axios.get("http://localhost:5000/rides/create", {
        params: { user: userId, pickup, destination, vehicleType: type },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://logospng.org/download/uber/logo-uber-4096.png"
        alt="logo"
      />
      <div className="h-screen w-screen" onClick={() => setVehiclePanel(false)}>
        {/* <img
          className="h-full w-full object-cover"
          src="https://th.bing.com/th/id/OIP.yvauclQ-ruJZlVLQBwSYPAHaHa?rs=1&pid=ImgDetMain"
          alt=""
        /> */}
        <LiveTracking />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            className={
              panelOpen
                ? "absolute top-6 right-6 text-2xl opacity-1"
                : "absolute top-6 right-6 text-2xl opacity-0"
            }
            onClick={() => setPanelOpen(false)}
          >
            <RiArrowDownWideLine />
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
          <form onSubmit={(e) => submitHandler(e)}>
            <input
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
              value={pickup}
              onChange={(e) => handlePickupChange(e)}
              onFocus={() => setFocusedField("pickup")}
            />
            <input
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your location"
              value={destination}
              onChange={(e) => handleDestinationChange(e)}
              onFocus={() => setFocusedField("destination")}
            />
          </form>
          <button
            onClick={() => handleFindTrip()}
            className="w-full bg-black text-white py-3 rounded-lg mt-8 font-medium hover:bg-gray-800 transition-colors"
          >
            Find Trip
          </button>
        </div>
        <div ref={panalRef} className="h-0 bg-white mt-2">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-10 pt-14 bg-white translate-y-full"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          vehiclePanel={vehiclePanel}
          data={vehiclesFares}
          setVehicalType={setVehicalType}
          setVehicalImg={setVehicalImg}
        />
      </div>
      <div
        ref={confiremRidePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-14 bg-white translate-y-full"
      >
        <ConfirmRide
          vehicleImg={vehicleImg}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          data={vehiclesFares}
          createRide={createRide}
          confirmRidePanel={confirmRidePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicalFound={setVehicalFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-14 bg-white translate-y-full"
      >
        <LookingForDriver
          vehicleImg={vehicleImg}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          data={vehiclesFares}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicalFound={setVehicalFound}
          vehicleFound={vehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 pt-14 mt-5 bg-white translate-y-full"
      >
        <WaitForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
          vehicleImg={vehicleImg}
        />
      </div>
    </div>
  );
};

export default Home;

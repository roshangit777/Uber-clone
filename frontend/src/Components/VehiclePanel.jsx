import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
const VehiclePanel = ({
  setVehiclePanel,
  vehiclePanel,
  setConfirmRidePanel,
  data,
  setVehicalImg,
  setVehicalType,
}) => {
  return (
    <>
      <h5
        className={
          vehiclePanel
            ? "p-1 flex items-center justify-center pt-3 text-3xl w-[93%] absolute top-0 opacity-1"
            : "opacity-0"
        }
        onClick={() => setVehiclePanel(false)}
      >
        <RiArrowDownWideLine />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          /* createRide("car"); */
          setConfirmRidePanel(true);
          setVehicalType("car");
          setVehicalImg(
            "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          );
        }}
        className="flex w-full border-2 mb-2 active:border-black rounded-xl p-3 items-center justify-between"
      >
        <img
          className="h-14"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="-ml-6 w-1/2l">
          <h4 className="font-medium text-base flex items-center gap-1">
            UberGo
            <span>
              <FaUser />
            </span>
            <span>4</span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">Rs: {data.car}</h2>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          setVehicalType("motorcycle");
          setVehicalImg(
            "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          );
        }}
        className="flex w-full border-2 mb-2 active:border-black rounded-xl p-3 items-center justify-between"
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2l">
          <h4 className="font-medium text-base flex items-center gap-1">
            Moto
            <span>
              <FaUser />
            </span>
            <span>1</span>
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motercycle rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">Rs: {data.motorcycle}</h2>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          setVehicalType("auto");
          setVehicalImg(
            "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          );
        }}
        className="flex w-full border-2 mb-2 active:border-black rounded-xl p-3 items-center justify-between"
      >
        <img
          className="h-14"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="-ml-8 w-1/2l">
          <h4 className="font-medium text-base flex items-center gap-1">
            Auto
            <span>
              <FaUser />
            </span>
            <span>3</span>
          </h4>
          <h5 className="font-medium text-sm">5 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, auto rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">Rs: {data.auto}</h2>
      </div>
    </>
  );
};

export default VehiclePanel;

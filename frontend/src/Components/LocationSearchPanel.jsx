import React, { useContext } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { UserDataContext } from "../context/UserContext";
const LocationSearchPanel = ({ setVehiclePanel, setPanelOpen }) => {
  const { pickup, focusedField, setPickup, setDestination, picupLocations } =
    useContext(UserDataContext);

  return (
    <div>
      {picupLocations.map((location) => {
        return (
          <div
            onClick={() => {
              if (focusedField === "pickup") {
                setPickup(location); // Set location for pickup field
              } else if (focusedField === "destination") {
                setDestination(location); // Set location for destination field
              }
            }}
            key={location.id}
            className="flex border-2 p-3 border-gray-100 active:border-black rounded-xl  items-center gap-4 my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-10 w-10 text-2xl flex items-center justify-center rounded-full">
              <MdOutlineLocationOn />
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;

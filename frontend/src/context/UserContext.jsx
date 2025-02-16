import axios from "axios";
import { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [pickup, setPickup] = useState("");
  const [picupLocations, setPickupLoactions] = useState([]);
  const [destination, setDestination] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handlePickupChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPickup(value);

    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          value
        )}&key=${import.meta.env.KEY}`
      );
      if (response.status === 200) {
        const data = response.data;
        const suggestions = data.predictions.map(
          (prediction) => prediction.description
        );
        setPickupLoactions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setDestination(value);

    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          value
        )}&key=${import.meta.env.KEY}`
      );
      if (response.status === 200) {
        const data = response.data;
        const suggestions = data.predictions.map(
          (prediction) => prediction.description
        );
        setPickupLoactions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        user,
        pickup,
        destination,
        picupLocations,
        focusedField,
        setPickup,
        setUser,
        handlePickupChange,
        setDestination,
        setFocusedField,
        handleDestinationChange,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

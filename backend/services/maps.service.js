const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

/* const getAddressCoordinates = async (address) => {
  const API_KEY = process.env.MAP;

  try {
    const response = await axios.get(
      `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );

    if (response.status === 200 && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    }

    throw new Error("No results found for this address");
  } catch (error) {
    console.error(`Error fetching coordinates: ${error.message}`);
    throw new Error(`Failed to get coordinates: ${error.message}`);
  }
};
*/

const getMapDistance = async (pickup, destination) => {
  const API_KEY = process.env.MAP;
  try {
    const response = await axios.get(
      `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(
        destination
      )}&origins=${encodeURIComponent(pickup)}&key=${API_KEY}`
    );

    if (response.status === 200) {
      const data = response.data.rows[0].elements[0];
      return data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.getMapDistance = getMapDistance;

const dot = require("dotenv");
dot.config();
const axios = require("axios");
const { getMapDistance } = require("../services/maps.service");
const { listIndexes } = require("../models/user.model");
const captainModel = require("../models/captain.model");

const getCoardinates = async (address) => {
  const API_KEY = process.env.MAP;
  try {
    const response = await axios.get(
      `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );

    if (response.status === 200) {
      const data = response.data.results[0].geometry.location;
      return data;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "coardinates not found" });
  }
};

const getDistance = async (req, res) => {
  const pickup = encodeURIComponent(req.body.origin.toString());
  const destination = encodeURIComponent(req.body.destination.toString());
  try {
    const response = await getMapDistance(pickup, destination);

    if (response.length > 0) {
      return res.status(200).json({ response });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "coardinates not found" });
  }
};

const getSuggestion = async (req, res) => {
  const place = encodeURIComponent(req.body.place.toString());
  const API_KEY = process.env.MAP;
  try {
    const response = await axios.get(
      `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        place
      )}&key=${API_KEY}`
    );

    if (response.status === 200) {
      const data = response.data;
      const suggestions = data.predictions.map(
        (prediction) => prediction.description
      );
      return res.status(200).json({ suggestions });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "coardinates not found" });
  }
};

const getCaptainsInTheRadius = async (ltd, lng, radius) => {
  console.log(`ltd is ${ltd}, lng is ${lng}, and radius is ${radius}`);

  // Validation check
  if (
    typeof ltd !== "number" ||
    typeof lng !== "number" ||
    typeof radius !== "number"
  ) {
    throw new Error(
      "Invalid input values. Ensure ltd, lng, and radius are numbers."
    );
  }

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};

exports.getCoardinates = getCoardinates;
exports.getDistance = getDistance;
exports.getSuggestion = getSuggestion;
exports.getCaptainsInTheRadius = getCaptainsInTheRadius;

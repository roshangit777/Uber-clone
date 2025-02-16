const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const Maprouter = express.Router();
const {
  getCoardinates,
  getDistance,
  getSuggestion,
} = require("../controllers/map.controllers");
Maprouter.get("/get-coardinates", protectRoute, getCoardinates);
Maprouter.get("/get-distance", protectRoute, getDistance);
Maprouter.post("/get-suggestions", getSuggestion);

module.exports = Maprouter;

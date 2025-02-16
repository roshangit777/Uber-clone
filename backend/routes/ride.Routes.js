const express = require("express");
const {
  createRideController,
  getAllFare,
  confirmRide,
  startRide,
  endRide,
} = require("../controllers/ride.controller");
const protectRoute = require("../middleware/protectRoute");
const RideRouter = express.Router();

RideRouter.get("/create", createRideController);
RideRouter.get("/getallfares", getAllFare);
RideRouter.post("/confirm", confirmRide);
RideRouter.post("/start-ride", startRide);
RideRouter.post("/end-ride", endRide);

module.exports = RideRouter;

const { default: mongoose } = require("mongoose");
const Ride = require("../models/ride.model");
const { getMapDistance } = require("../services/maps.service");
const { createRide } = require("../services/ride.service");
const { sendMessageToSocketId } = require("../socket");
const { getCaptainsInTheRadius, getCoardinates } = require("./map.controllers");

const createRideController = async (req, res) => {
  const user = req.query.user;
  const pickup = encodeURIComponent(req.query.pickup);
  const destination = encodeURIComponent(req.query.destination);
  const vehicleType = encodeURIComponent(req.query.vehicleType);

  if (!user || !pickup || !destination || !vehicleType) {
    return res.status(400).json({
      error: "user, pickup, destination, and vehicleType are required",
    });
  }
  try {
    const ride = await createRide(user, pickup, destination, vehicleType);
    await ride.save();
    res.status(201).json({ ride });
    const pickupCoardinates = await getCoardinates(pickup);

    const captainInRadius = await getCaptainsInTheRadius(
      pickupCoardinates.lat,
      pickupCoardinates.lng,
      100
    );

    ride.otp = "";

    const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");
    captainInRadius.map(async (captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (err) {
    /* return res.status(500).json({ error: err.message }); */
    console.log(err);
  }
};

const getAllFare = async (req, res) => {
  const pickup = encodeURIComponent(req.query.pickup);
  const destination = encodeURIComponent(req.query.destination);

  if (!pickup || !destination) {
    throw new Error("pickup and destination are required");
  }

  try {
    const distanceTime = await getMapDistance(pickup, destination);

    const RATES = {
      auto: { base: 25, perKm: 12, perMin: 1 },
      car: { base: 40, perKm: 15, perMin: 2 },
      motorcycle: { base: 20, perKm: 10, perMin: 0.5 },
    };

    const fares = {};
    const distance = distanceTime.distance.value / 1000;
    const duration = distanceTime.duration.value / 60;

    for (const [vehicle, rate] of Object.entries(RATES)) {
      const distanceCost = distance * rate.perKm;
      const timeCost = duration * rate.perMin;
      fares[vehicle] = Math.round(rate.base + distanceCost + timeCost);
    }
    return res.status(200).json({ fares });
  } catch (err) {
    console.log("Error in getAllFare:", err);
    return res.status(500).json({ error: "Internal server error", err });
  }
};

const confirmRide = async (req, res) => {
  const { rideId, captainId } = req.body;
  const objectRideId = new mongoose.Types.ObjectId(rideId);

  if (!rideId) {
    return res.status(400).json({ error: "Ride doesn't exist" });
  }
  try {
    await Ride.findByIdAndUpdate(
      { _id: objectRideId },
      { status: "accepted", captain: captainId }
    );
    const ride = await Ride.findOne({ _id: objectRideId })
      .populate("user")
      .populate("captain")
      .select("+otp");
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    res.status(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const startRide = async (req, res) => {
  const { rideId, otp } = req.body;

  if (!rideId || !otp) {
    return res.status(401).json({ error: "Ride id or otp is wrong" });
  }

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    return res.status(401).josn({ error: "Ride not found" });
  }

  if (ride.status !== "accepted") {
    return res.status(401).json({ error: "Ride not accepted" });
  }

  if (ride.otp !== otp) {
    return res.status(401).json({ error: "Invalid OTP" });
  }

  await Ride.findByIdAndUpdate({ _id: rideId }, { status: "ongoing" });

  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });

  return res.status(200).json(ride);
};

const endRide = async (req, res) => {
  const { rideId } = req.body;

  if (!rideId) {
    return res.status(401).json({ error: "Ride is Empty" });
  }
  try {
    const ride = await Ride.findByIdAndUpdate(
      { _id: rideId },
      { status: "completed" }
    ).populate("user");
    if (!ride) {
      return res.status(401).json({ error: "Ride doesn't exist" });
    }

    sendMessageToSocketId(ride.user.socketId, {
      event: "end-ride",
      data: ride,
    });
    return res.status(200).json({ ride });
  } catch (error) {}
};

exports.createRideController = createRideController;
exports.getAllFare = getAllFare;
exports.confirmRide = confirmRide;
exports.startRide = startRide;
exports.endRide = endRide;

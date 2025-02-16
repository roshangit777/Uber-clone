const Ride = require("../models/ride.model");
const { getMapDistance } = require("./maps.service");
const crypto = require("crypto");

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("pickup and destination are required");
  }

  const distanceTime = await getMapDistance(pickup, destination);

  const RATES = {
    auto: { base: 25, perKm: 12, perMin: 1 },
    car: { base: 40, perKm: 15, perMin: 2 },
    motorcycle: { base: 20, perKm: 10, perMin: 0.5 },
  };

  const calculateFares = (response) => {
    const fares = {};
    const distance = response.distance.value / 1000;
    const duration = response.duration.value / 60;

    for (const [vehicle, rate] of Object.entries(RATES)) {
      const distanceCost = distance * rate.perKm;
      const timeCost = duration * rate.perMin;
      fares[vehicle] = Math.round(rate.base + distanceCost + timeCost);
    }
    return fares;
  };

  return calculateFares(distanceTime);
};

const getOtp = (num) => {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
};

const createRide = async (user, pickup, destination, vehicleType) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("user, pickup, destination, and vehicleType are required");
  }
  const fare = await getFare(pickup, destination);
  const ride = new Ride({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

exports.getFare = getFare;
exports.createRide = createRide;

const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be at least 3 charecters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Lastname must be at least 3 charecters long"],
    },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 charecters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    ltd: { type: Number },
    lng: { type: Number },
  },
});

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;

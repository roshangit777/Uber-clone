const dotenv = require("dotenv");
dotenv.config();
const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookie = require("../utils/generateTokenandSetCoockie");
const jwt = require("jsonwebtoken");

const captainRegister = async (req, res, next) => {
  try {
    const { fullname, email, password, vehicle } = req.body;
    console.log(req.body);
    const isCaptainExist = await captainModel.findOne({ email });
    if (isCaptainExist) {
      return res.status(400).json({ message: "User alredy exist" });
    }

    /*  const isVehicleExist = await captainModel.findOne({vehicle[plate]:{ vehicle.plate}});
    if (isVehicleExist) {
      return res.status(400).json({ message: "vehicle alredy exist" });
    } */
    const hashPassword = await bcrypt.hash(password, 10);
    const newCaptain = new captainModel({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      },
    });
    if (newCaptain) {
      generateTokenAndSetCookie(newCaptain._id, res);
      const token = jwt.sign(
        { userId: newCaptain._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "15d",
        }
      );
      await newCaptain.save();
      return res.status(201).json({
        newCaptain,
        token,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const captainLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await captainModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid password or email" });
    }
    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password or email" });
    }
    if (user && isMatch) {
      generateTokenAndSetCookie(user._id, res);
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });
      return res.status(201).json({ user, token });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const captainProfile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const captainLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(201).json({ message: "Logout successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.captainRegister = captainRegister;
exports.captainLogin = captainLogin;
exports.captainLogout = captainLogout;
exports.captainProfile = captainProfile;

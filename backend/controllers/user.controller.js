const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookie = require("../utils/generateTokenandSetCoockie");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const isUserExits = await userModel.findOne({ email: email });
    if (isUserExits) {
      return res.status(400).json({ error: "Email alredy exist" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be more the 6 charecters" });
    }

    const hashPassword = await userModel.hashPassword(password);

    const newUser = new userModel({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });
      await newUser.save();
      res.status(201).json({
        newUser,
        token,
      });
    } else {
      return res.status(400).json({ error: "Invalid user details" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user?.password || "");

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const userLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(201).json({ message: "Logout successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.userRegister = userRegister;
exports.userLogin = userLogin;
exports.userProfile = userProfile;
exports.userLogout = userLogout;

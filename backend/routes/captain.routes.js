const express = require("express");
const {
  captainRegister,
  captainProfile,
  captainLogin,
  captainLogout,
} = require("../controllers/captain.controller");
const captainProtectRoute = require("../middleware/captainProtectRoute");
const captainRoutes = express.Router();

captainRoutes.post("/register", captainRegister);
captainRoutes.post("/login", captainLogin);
captainRoutes.get("/profile", captainProtectRoute, captainProfile);
captainRoutes.post("/logout", captainLogout);

module.exports = captainRoutes;

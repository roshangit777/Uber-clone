const express = require("express");
const {
  userRegister,
  userLogin,
  userProfile,
  userLogout,
} = require("../controllers/user.controller");
const protectRoute = require("../middleware/protectRoute");
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", protectRoute, userProfile);
router.post("/logout", userLogout);
module.exports = router;

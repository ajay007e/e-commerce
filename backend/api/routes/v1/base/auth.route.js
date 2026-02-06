const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  forgetPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  resendEmailVerification,
} = require("../../../controllers/v1/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getMe);

router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);
router.get("/verify-email", verifyEmail);
router.post("/verify-email", resendEmailVerification);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/authz.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

router.put(
  "/profile/image",
  authMiddleware,
  upload.single("image"),
  uploadProfileImage
);

module.exports = router;
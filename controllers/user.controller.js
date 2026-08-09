const User = require("../models/user.model");

// Get logged-in user's profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update logged-in user's profile
const updateProfile = async (req, res) => {
  try {
    const { username, email, bio, profileImage } = req.body;

    const updateFields = { username, email, bio };

    if (profileImage !== undefined) {
      updateFields.profileImage = profileImage;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Upload / change profile image
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { profileImage: imageUrl },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile image updated",
      profileImage: updatedUser.profileImage,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
};
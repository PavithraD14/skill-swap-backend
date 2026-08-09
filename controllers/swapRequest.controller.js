const swapRequestModel = require("../models/swapRequest.model");

const createSwapRequest = async (req, res) => {
  try {
    const { receiverId, skillId, skillOffered, skillWanted } = req.body;


    const existing = await swapRequestModel.findOne({
      senderId: req.userId,
      skillId,
      status: "Pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "You already sent a request for this skill",
      });
    }

    const newRequest = await swapRequestModel.create({
      senderId: req.userId,
      receiverId,
      skillId,
      skillOffered,
      skillWanted,
    });

    res.status(201).json({
      message: "Swap request sent successfully",
      data: newRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await swapRequestModel
      .find({ receiverId: req.userId })
      .sort({ createdAt: -1 }) 
      .populate("senderId", "username")
      .populate("receiverId", "username")
      .populate("skillId")
      .populate("reviewerId", "username");

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getSentRequests = async (req, res) => {
  try {
    const requests = await swapRequestModel
      .find({ senderId: req.userId })
      .sort({ createdAt: -1 })
      .populate("senderId", "username")
      .populate("receiverId", "username")
      .populate("skillId")
      .populate("reviewerId", "username");

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch sent requests",
    });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await swapRequestModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Request updated successfully",
      data: request,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update request",
    });
  }
};

const submitReview = async (req, res) => {
  try {
    const { rating, reviewComment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "A rating between 1 and 5 is required",
      });
    }

    const existingRequest = await swapRequestModel.findById(req.params.id);

    if (!existingRequest) {
      return res.status(404).json({
        message: "Swap request not found",
      });
    }

    if (existingRequest.status !== "Accepted") {
      return res.status(400).json({
        message: "Only accepted requests can be reviewed",
      });
    }

   const request = await swapRequestModel.findByIdAndUpdate(
  req.params.id,
  {
    rating,
    reviewComment,
    reviewed: true,
    reviewerId: req.userId,
  },
  { new: true }
);

    res.status(200).json({
      message: "Review submitted successfully",
      data: request,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to submit review",
    });
  }
};

module.exports = {
  createSwapRequest,
  getMyRequests,
  getSentRequests,
  updateRequestStatus,
  submitReview,
};
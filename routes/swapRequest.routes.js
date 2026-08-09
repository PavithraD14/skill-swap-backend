const express = require("express");
const router = express.Router();

const swapRequestController = require("../controllers/swapRequest.controller");
const authMiddleware = require("../middleware/authz.middleware");

router.post("/", authMiddleware, swapRequestController.createSwapRequest);
router.get("/", authMiddleware, swapRequestController.getMyRequests);

router.get("/sent", authMiddleware, swapRequestController.getSentRequests);
router.put("/:id", authMiddleware, swapRequestController.updateRequestStatus);
router.put("/:id/review", authMiddleware, swapRequestController.submitReview);

module.exports = router;
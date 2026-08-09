const express = require("express");
const router = express.Router();

const skillController = require("../controllers/skill.controller");
const authMiddleware = require("../middleware/authz.middleware");

router.get("/", authMiddleware, skillController.getAllSkills);
router.post("/", authMiddleware, skillController.createSkill);
router.put("/:id", authMiddleware, skillController.updateSkill);
router.delete("/:id", authMiddleware, skillController.deleteSkill);


router.get("/browse", authMiddleware, skillController.getBrowseSkills);

module.exports = router;
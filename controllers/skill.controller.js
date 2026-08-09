const skillModel = require("../models/skill.model");


//GET SKILL
const getAllSkills = async (req, res) => {
    try {
        const skills = await skillModel.find({
            userId: req.userId
        }).sort({ createdAt: -1 });

        res.status(200).json(skills);
    } catch (err) {
        res.status(500).json({ message: "Skills fetching failed" });
    }
};


// GET other users' skills (Browse Skills)
const getBrowseSkills = async (req, res) => {
    try {
        const skills = await skillModel
            .find({
                userId: { $ne: req.userId },
            })
            .populate("userId", "username")
            .sort({ createdAt: -1 })

        res.status(200).json(skills);
    } catch (err) {
        res.status(500).json({ message: "Browse skills fetching failed" });
    }
};

// POST create skill
const createSkill = async (req, res) => {
    try {
        const { skillName, category, level, duration, exchangeSkill, type } = req.body;

        if (!skillName) {
            return res.status(400).json({ message: "Skill name is required" });
        }

        const skill = await skillModel.create({
            skillName,
            category,
            level,
            duration,
            exchangeSkill,
            type,
            userId: req.userId
        });

        res.status(201).json(skill);
    } catch (err) {
        res.status(500).json({ message: "Skill creation failed" });
    }
};

// PUT update skill
const updateSkill = async (req, res) => {
    try {
        const skill = await skillModel.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!skill) {
            return res.status(401).json({ message: "Unauthorized: Access denied" });
        }

        const updatedSkill = await skillModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedSkill);
    } catch (err) {
        res.status(500).json({ message: "Skill update failed" });
    }
};

// DELETE skill
const deleteSkill = async (req, res) => {
    try {
        const skill = await skillModel.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!skill) {
            return res.status(401).json({ message: "Unauthorized: Access denied" });
        }

        await skillModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Skill deleted" });
    } catch (err) {
        res.status(500).json({ message: "Skill deletion failed" });
    }
};

module.exports = {
    getAllSkills,
    getBrowseSkills,
    createSkill,
    updateSkill,
    deleteSkill
};


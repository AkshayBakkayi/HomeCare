import { Team } from "../models/Team.js";


// CREATE TEAM MEMBER
export const createTeam = async (req, res) => {
  try {
    const { name, role, experience, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: "Image required" });
    }

    const team = new Team({
      name,
      role,
      experience,
      description,
      image,
    });

    await team.save();

    res.status(201).json({
      success: true,
      message: "Team member created",
      data: team,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL TEAM
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: teams,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET TEAM BY ID
export const getTeamById = async (req, res) => {
  try {

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team member not found" });
    }

    res.status(200).json({
      success: true,
      data: team,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE TEAM
export const updateTeam = async (req, res) => {
  try {

    const { name, role, experience, description } = req.body;

    let updateData = {};

    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (experience) updateData.experience = experience;
    if (description) updateData.description = description;

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!team) {
      return res.status(404).json({ message: "Team member not found" });
    }

    res.status(200).json({
      success: true,
      message: "Team updated",
      data: team,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE TEAM
export const deleteTeam = async (req, res) => {
  try {

    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team member not found" });
    }

    res.status(200).json({
      success: true,
      message: "Team deleted",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
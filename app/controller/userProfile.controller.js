const db = require("../model");
const { userProfile } = db;

const createProfile = async (req, res) => {
  const {
    bio = "",
    profile_picture = 0,
    experiance = "",
    skills = "",
    company_name = "",
    website = "",
    created_at = "",
    updated_at = "",
  } = req.body;
  const { id } = req;
  try {
    const existingProfile = await userProfile.findOne({
      where: { user_id: id },
    });

    if (existingProfile) {
      return res
        .status(400)
        .json({ status: false, message: "Profile already exists" });
    }

    const newProfile = await userProfile.create({
      user_id: id,
      bio,
      profile_picture,
      experiance,
      skills,
      company_name,
      website,
      created_at,
      updated_at,
    });

    return res.status(201).json({
      status: true,
      message: "Profile created successfully",
      profile: newProfile,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  const { id } = req;
  try {
    const profile = await userProfile.findOne({
      where: { user_id: id },
    });

    if (!profile)
      return res.status(404).json({
        status: false,
        message: "Profile not found",
      });

    return res.status(200).json({
      status: true,
      message: "Profile fetched",
      profile,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req;
  try {
    const updatedProfile = await userProfile.findOne({
      where: { user_id: id },
    });

    if (!updatedProfile) {
      return res.status(404).json({
        status: true,
        message: "Profile not found, please create a profile.",
      });
    }

    await userProfile.update(req.body, {
      where: { user_id: id },
    });

    return res.status(200).json({
      status: true,
      message: "Profile updated",
      profile: updatedProfile,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

const deleteProfile = async (req, res) => {
  const { id } = req;
  try {
    const deletedProfile = await userProfile.findOne({
      where: { user_id: id },
    });

    if (!deletedProfile)
      return res.status(404).json({
        status: false,
        message: "Profile not found",
      });

    if (deletedProfile) {
      await deletedProfile.destroy();
    }

    return res.status(200).json({
      status: true,
      message: "Profile deleted",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};

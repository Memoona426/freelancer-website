const db = require("../model");
const { userProfile, users } = db;

const createProfile = async (req, res) => {
  const {
    bio = "",
    profile_picture = 0,
    experiance = "",
    skills = "",
    company_name = "",
    website = ""
  } = req.body;
  const { id } = req;
  try {
    const existingProfile = await users.findOne({
      where: { id },
      include: [
        {
          model: userProfile,
          as: 'userProfile'
        }
      ]
    });


    if (existingProfile?.userProfile) {
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
      website
    });

    return res.status(201).json({
      status: true,
      message: "Profile created successfully",
      data: newProfile,
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
    const profile = await users.findOne({
      where: { id },
      include: [
        {
          model: userProfile,
          as: 'userProfile'
        }
      ]
    });

    if (!profile?.userProfile)
      return res.status(404).json({
        status: false,
        message: "Profile not found",
      });

    return res.status(200).json({
      status: true,
      message: "Profile fetched",
      data: profile?.userProfile,
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
    const updatedProfile = await users.findOne({
      where: { id },
      include: [
        {
          model: userProfile,
          as: 'userProfile'
        }
      ]
    });

    if (!updatedProfile?.userProfile) {
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
      profile: updatedProfile?.userProfile,
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
    const deletedProfile = await users.findOne({
      where: { id },
      include: [
        {
          model: userProfile,
          as: 'userProfile'
        }
      ]
    });

    if (!deletedProfile?.userProfile)
      return res.status(404).json({
        status: false,
        message: "Profile not found",
      });

    if (deletedProfile?.userProfile) {
      await userProfile.destroy({
        where: {
          id: deletedProfile?.userProfile?.id
        }
      });
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

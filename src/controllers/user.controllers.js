import User from "../models/User.js";
import { signObject } from "../shared/auth.js";

//Create User
const createUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      preferred_mode: req.body.preferred_mode,
      daily_goal: req.body.daily_goal,
      is_setup_complete: req.body.is_setup_complete,
      device_id: req.body.device_id,
    });

    const response = await newUser.save();
    const user = response.toObject();
    const token = signObject(user);

    res.status(201).json({ data: { ...user, token }, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
};

//Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ data: null, error: "not found" });
      return;
    }

    user.name = req?.body?.name ?? user?.name;
    user.preferred_mode = req?.body?.preferred_mode ?? user?.preferred_mode;
    user.daily_goal = req?.body?.daily_goal ?? user?.daily_goal;
    user.is_setup_complete =
      req?.body?.is_setup_complete ?? user?.is_setup_complete;
    user.device_id = req?.body?.device_id ?? user?.device_id;

    user.xp = req?.body?.xp ?? user?.xp;
    user.hp = req?.body?.hp ?? user?.hp;
    user.level = req?.body?.level ?? user?.level;

    const response = await user.save();
    res.status(200).json({ data: response, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
};

//Get User by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id);

    if (!response) {
      return res.status(404).json({ data: null, error: "User not found" });
    }
    res.status(200).json({ data: response, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
};

//Get Users
const getUsers = async (req, res) => {
  try {
    const response = await User.find();

    res.status(200).json({ data: response, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: error.message });
  }
};

export default {
  createUser,
  updateUser,
  getUserById,
  getUsers,
};

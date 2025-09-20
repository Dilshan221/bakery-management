import User from "../models/userModel.js";

export const create = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    const { email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    const { id } = req.params;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

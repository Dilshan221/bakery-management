import Attendance from "../models/attendanceModel.js";
import User from "../models/userModel.js";

// Mark attendance
export const markAttendance = async (req, res) => {
  try {
    const { userId, date, checkIn, checkOut, status } = req.body;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if attendance already exists for this user and date
    const existingAttendance = await Attendance.findOne({ userId, date });
    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already marked for this date" });
    }

    const attendance = new Attendance({
      userId,
      date: date || new Date(),
      checkIn,
      checkOut,
      status
    });

    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

// Get all attendance records
export const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('userId', 'name email department position');
    
    if (attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }
    
    res.status(200).json(attendance);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

// Get attendance for a specific user
export const getUserAttendance = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const attendance = await Attendance.find({ userId }).populate('userId', 'name email department position');
    
    if (attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found for this user" });
    }
    
    res.status(200).json(attendance);
  } catch (error) {
    console.error("Error fetching user attendance:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

// Update attendance
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('userId', 'name email department position');

    res.status(200).json(updatedAttendance);
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  status: {
    type: String,
    enum: ["present", "late", "absent"],
    default: "absent",
  },
});

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

// Check if the model already exists before creating it
export default mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);

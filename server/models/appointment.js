import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "assigned", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
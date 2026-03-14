// models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    address: String,

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    },

    appointmentDate: Date,
    timeSlot: String,

    source: {
      type: String,
      enum: ["whatsapp", "call"],
      default: "whatsapp"
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
      },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "assigned",
        "completed",
        "cancelled"
      ],
      default: "pending"
    },

    notes: String
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
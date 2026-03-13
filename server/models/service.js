import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      required: true,
    },

    description: [
      {
        type: String,
        trim: true,
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
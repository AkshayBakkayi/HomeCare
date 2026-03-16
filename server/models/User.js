import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: { 
    type: String,
    required: true },

  email: {
    type: String,
    required: true,
    unique: true
  },

  mobile: {
    type: String,
    required: true,
    unique: true
  },

  DOB: {
    type: Date,
    required: true,
  },

  address: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  isVerified: {
    type: Boolean,
    default: true
  },

  role: {
    type: String,
    enum: ["patient", "admin","doctor"],
    default: "patient"
  }

},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
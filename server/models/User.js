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
    default: false
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }

},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
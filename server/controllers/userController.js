import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";


// ---------------- SEND EMAIL ----------------
const sendEmail = async (user) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Welcome to HomeCare",
      html: `
        <h3>Hello ${user.name},</h3>
        <p>Welcome to our HomeCare service!</p>
        <p>Your account has been successfully created.</p>
        <p>Best Regards,<br/>HomeCare Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    console.log("Welcome email sent");

  } catch (error) {

    console.error("Email sending failed:", error);

  }
};


// ---------------- REGISTER ----------------
export const registerUser = async (req, res) => {

  try {

    const { name, email, mobile, DOB, address, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists ❌"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      DOB,
      address,
      password: hashedPassword
    });

    await newUser.save();

    await sendEmail(newUser);

    res.status(201).json({
      message: "User registered successfully ✅"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Registration failed ❌",
      error: error.message
    });

  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials ❌"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials ❌"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Login failed ❌",
      error: error.message
    });

  }

};


// ---------------- FORGOT PASSWORD ----------------
export const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌"
      });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink =
      `http://localhost:3000/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset Password",
      html: `
      <p>Hello ${user.name},</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 15 minutes.</p>
      `
    });

    res.json({
      message: "Reset password link sent to email ✅"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to send reset email ❌"
    });

  }

};


// ---------------- RESET PASSWORD ----------------
export const resetPassword = async (req, res) => {

  try {

    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password reset successful ✅"
    });

  } catch (error) {

    res.status(400).json({
      message: "Invalid or expired token ❌"
    });

  }

};


// GET ALL REGISTERED USERS (ADMIN)
export const getUsers = async (req, res) => {
  try {

    const users = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
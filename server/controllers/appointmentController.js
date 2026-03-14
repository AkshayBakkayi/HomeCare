// controllers/AppointmentController.js

import { Appointment } from "../models/appointment.js";


// CREATE APPOINTMENT (ADMIN)
export const createAppointment = async (req, res) => {
  try {

    const appointment = new Appointment(req.body);

    await appointment.save();

    res.status(201).json({
      success: true,
      data: appointment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL APPOINTMENTS
export const getAppointments = async (req, res) => {
  try {

    const appointments = await Appointment
      .find()
      .populate("serviceId")
      .populate("teamId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: appointments
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE STATUS
export const updateAppointment = async (req, res) => {
  try {

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: appointment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE
export const deleteAppointment = async (req, res) => {
  try {

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Appointment deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


import express from "express";
import {
 createAppointment,
 getAppointments,
 updateAppointment,
 deleteAppointment
} from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/appointment", createAppointment);
appointmentRouter.get("/appointment", getAppointments);
appointmentRouter.put("/appointment/:id", updateAppointment);
appointmentRouter.delete("/appointment/:id", deleteAppointment);

export default appointmentRouter;
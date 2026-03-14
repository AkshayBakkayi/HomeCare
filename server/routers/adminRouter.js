import express from "express";
import {
  createService,
  updateService,
  deleteService,
  getServices
} from "../controllers/ServiceController.js";

import {
  createTeam,
  updateTeam,
  deleteTeam,
  getTeams
} from "../controllers/TeamController.js";

import upload from "../middleware/upload.js";

import { getUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/service", createService);
router.get("/service", getServices);
router.put("/service/:id", updateService);
router.delete("/service/:id", deleteService);

router.get("/team", getTeams);
router.post("/team", upload.single("photo"), createTeam);
router.put("/team/:id", upload.single("photo"), updateTeam);
router.delete("/team/:id", deleteTeam);

router.get("/users", getUsers);

export default router;
import { Service } from "../models/service.js";


// CREATE SERVICE
export const createService = async (req, res) => {
  try {

    const { serviceName, icon, description } = req.body;

    const service = new Service({
      serviceName,
      icon,
      description
    });

    await service.save();

    res.status(201).json({
      success: true,
      message: "Service created",
      data: service,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// GET SERVICES
export const getServices = async (req, res) => {
  try {

    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: services,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SERVICE BY ID
export const getServiceById = async (req, res) => {
  try {

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      success: true,
      data: service,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE SERVICE
export const updateService = async (req, res) => {
  try {

    const { serviceName, icon, description } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        serviceName,
        icon,
        description
      },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service updated",
      data: service,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE SERVICE
export const deleteService = async (req, res) => {
  try {

    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
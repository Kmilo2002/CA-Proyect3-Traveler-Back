const express = require("express");
const LoggingRouter = express.Router();
const Logging = require("../models/Logging");

LoggingRouter.post("/register/logging", async (req, res) => {
  const { location, name, title, description, price } = req.body;
  try {
    let loggingFind = await Logging.findOne({ name });
    if (loggingFind) {
      return res.status(400).send({
        success: false,
        message: "Ya existe en Alojamiento con ese nombre!",
      });
    }
    if (!location || !name || !title || !description || !price) {
      return res.status(400).send({
        success: false,
        message: "¡No has rellendo todos los datos necesarios!",
      });
    }

    let myLogging = new Logging({
      location,
      name,
      title,
      description,
      price,
    });

    await myLogging.save();
    return res.status(201).send({
      succes: true,
      message: "Alojamiento creado correctamente",
      myLogging,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

LoggingRouter.get("/loggings", async (req, res) => {
  try {
    let alojamientos = await Logging.find({});
    if (!alojamientos) {
      return res.status(404).send({
        success: false,
        message: "¡There is no loggings in DB!",
      });
    }
    return res.status(200).send({
      success: true,
      alojamientos,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

LoggingRouter.get("/logging/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let logging = await Logging.findById(id);
    if (!logging) {
      return res.status(404).send({
        success: false,
        message: "¡There is no logging with that id!",
      });
    }
    return res.status(200).send({
      sucess: true,
      logging
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = LoggingRouter;

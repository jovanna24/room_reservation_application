const router = require("express").Router();
const { Event } = require("../../models");

router.post("/event-form", async (req, res) => {
  try {
    const { host, contact, title, description, reservation, room } = req.body;
    const newEvent = await Event.create(
      host,
      contact,
      title,
      description,
      reservation,
      room
    );
    res.JSON(newEvent);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occured while creating the event" });
  }
});

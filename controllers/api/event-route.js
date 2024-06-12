const router = require("express").Router();
const { Event } = require("../../models");

router.post("/event-form", async (req, res) => {
    try {
        const {host, contact, title, description, reservation, room} = req.body;
        const newEvent = await event.create(host, contact, title, description, reservation, room);
        res.JSON(newEvent);
    }
});
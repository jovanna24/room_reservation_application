const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Handlebars = require("handlebars");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory array to store bookings
const bookings = [];

// Routes
app.post("/book", (req, res) => {
  const { room, dateTime } = req.body;
  const existingBooking = bookings.find(
    (booking) => booking.room === room && booking.dateTime === dateTime
  );
  if (existingBooking) {
    return res
      .status(400)
      .send("Room is already booked for the selected date and time.");
  }
  bookings.push({ room, dateTime });
  res.send("Room booked successfully.");
});

app.get("/bookings", (req, res) => {
  res.send(bookings);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

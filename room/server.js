const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/room_booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const bookingSchema = new mongoose.Schema({
  room: String,
  dateTime: String,
  username: String,
  email: String,
});

const User = mongoose.model("User", userSchema);
const Booking = mongoose.model("Booking", bookingSchema);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: "Incorrect username." });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: "Incorrect password." });
    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hash, email });
  await newUser.save();
  res.send("User registered");
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("User logged in");
});

app.post("/logout", (req, res) => {
  req.logout();
  res.send("User logged out");
});

app.post("/book", async (req, res) => {
  const { room, dateTime } = req.body;

  if (!req.isAuthenticated()) {
    return res.status(401).send("User not authenticated.");
  }

  const { username, email } = req.user;

  if (!room || !dateTime) {
    return res.status(400).send("Room and dateTime are required.");
  }

  const existingBooking = await Booking.findOne({ room, dateTime });
  if (existingBooking) {
    return res
      .status(400)
      .send("Room is already booked for the selected date and time.");
  }

  const newBooking = new Booking({ room, dateTime, username, email });
  await newBooking.save();

  res.send("Room booked successfully.");
});

app.get("/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.send(bookings);
});

app.get("/available", async (req, res) => {
  const { room, date } = req.query;
  if (!room || !date) {
    return res.status(400).send("Room and date are required");
  }

  const bookings = await Booking.find({
    room,
    dateTime: { $regex: `^${date}` },
  });
  const bookedTimes = bookings.map((booking) => booking.dateTime.split(" ")[1]);

  const startHour = 7;
  const endHour = 19;
  const interval = 50;
  const allTimes = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    const startTime = `${hour < 10 ? "0" : ""}${hour}:00`;
    const endTime = `${hour < 10 ? "0" : ""}${hour}:50`;
    const timeSlot = `${startTime} - ${endTime}`;
    if (!bookedTimes.includes(startTime)) {
      allTimes.push(timeSlot);
    }
  }

  res.send(allTimes);
});

app.get("/rooms", (req, res) => {
  const rooms = [
    { id: "office116", name: "Office 116", coords: "57.5,32.2,15,17" },
    { id: "office115", name: "Office 115", coords: "57.7,50,15,18" },
    {
      id: "conferenceRoom",
      name: "Conference Room",
      coords: "27.1,32.2,19.6,35.5",
    },
    { id: "office112", name: "Office 112", coords: "6.5,43,14.5,17" },
    { id: "office111", name: "Office 111", coords: "6.5,25,14.5,17.7" },
    { id: "office110", name: "Office 110", coords: "6.5,6.6,22.5,18" },
    { id: "office109", name: "Office 109", coords: "29.6,6.6,17.3,18" },
    { id: "office108", name: "Office 108", coords: "47.4,6.6,19,18" },
    { id: "office107", name: "Office 107", coords: "73,6.6,12,18" },
    { id: "office106", name: "Office 106", coords: "79,25,14,27" },
    { id: "office105", name: "Office 105", coords: "79,52,14,21.2" },
    { id: "office104", name: "Office 104", coords: "76.6,74,17,19.3" },
    { id: "office103", name: "Office 103", coords: "52,75,24,18" },
    { id: "office102", name: "Office 102", coords: "27.1,75,24,18" },
  ];
  res.send(rooms);
});

app.get("/shutdown", (req, res) => {
  res.send("Shutting down the server...");
  server.close(() => {
    console.log("Server closed");
  });
});

// Start the server
if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} else {
  module.exports = app;
}

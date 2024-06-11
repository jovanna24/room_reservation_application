const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); 

const bookings = [];

function formatTime(hour, minute) {
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${formattedHour}:${formattedMinute} ${period}`;
}

function getAvailableTimes(room, date) {
    const startHour = 7;
    const endHour = 19;
    const interval = 50;
    const allTimes = [];

    for (let hour = startHour; hour <= endHour; hour++) {
        const startTime = formatTime(hour, 0);
        const endTime = formatTime(hour, 50);
        allTimes.push(`${startTime} - ${endTime}`);
    }

    const bookedTimes = bookings
        .filter(booking => booking.room === room && booking.dateTime.startsWith(date))
        .map(booking => {
            const dateTime = new Date(booking.dateTime);
            const hour = dateTime.getHours();
            const minute = dateTime.getMinutes();
            return `${formatTime(hour, minute)} - ${formatTime(hour, minute + interval)}`;
        });

    return allTimes.filter(time => !bookedTimes.includes(time));
}

const rooms = [
    { id: 'office116', name: 'Office 116', coords: '57.5,32.2,15,17' },
    { id: 'office115', name: 'Office 115', coords: '57.7,50,15,18' },
    { id: 'conferenceRoom', name: 'Conference Room', coords: '27.1,32.2,19.6,35.5' },
    { id: 'office112', name: 'Office 112', coords: '6.5,43,14.5,17' },
    { id: 'office111', name: 'Office 111', coords: '6.5,25,14.5,17.7' },
    { id: 'office110', name: 'Office 110', coords: '6.5,6.6,22.5,18' },
    { id: 'office109', name: 'Office 109', coords: '29.6,6.6,17.3,18' },
    { id: 'office108', name: 'Office 108', coords: '47.4,6.6,19,18' },
    { id: 'office107', name: 'Office 107', coords: '73,6.6,12,18' },
    { id: 'office106', name: 'Office 106', coords: '79,25,14,27' },
    { id: 'office105', name: 'Office 105', coords: '79,52,14,21.2' },
    { id: 'office104', name: 'Office 104', coords: '76.6,74,17,19.3' },
    { id: 'office103', name: 'Office 103', coords: '52,75,24,18' },
    { id: 'office102', name: 'Office 102', coords: '27.1,75,24,18' },
];

app.post('/book', (req, res) => {
    const { room, dateTime } = req.body;
    
    if (!room || !dateTime) {
        return res.status(400).send('Room and dateTime are required.');
    }

    const existingBooking = bookings.find(booking => booking.room === room && booking.dateTime === dateTime);
    if (existingBooking) {
        return res.status(400).send('Room is already booked for the selected date and time.');
    }
    bookings.push({ room, dateTime });
    res.send('Room booked successfully.');
});

app.get('/bookings', (req, res) => {
    res.send(bookings);
});

app.get('/available', (req, res) => {
    const room = req.query.room;
    const date = req.query.date;
    if (!room || !date) {
        return res.status(400).send('Room and date are required');
    }
    const availableTimes = getAvailableTimes(room, date);
    res.send(availableTimes);
});

app.get('/rooms', (req, res) => {
    res.send(rooms);
});

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/shutdown', (req, res) => {
    res.send('Shutting down the server...');
    server.close(() => {
        console.log('Server closed');
    });
});

if (require.main === module) {
    const server = app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
} else {
    module.exports = app;
}

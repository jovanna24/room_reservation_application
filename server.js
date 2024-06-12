const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html from the specific path
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'room', 'room-booking', 'index.html');
  console.log(`Serving file: ${filePath}`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error sending file: ${err.message}`);
      res.status(500).send('An error occurred');
    }
  });
});

// Route to serve test.html
app.get('/test.html', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'test.html');
  console.log(`Serving test file: ${filePath}`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error sending test file: ${err.message}`);
      res.status(500).send('An error occurred');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

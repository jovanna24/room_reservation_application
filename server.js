<<<<<<< HEAD
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
=======
const path= require('path'); 
const express= require('express'); 
const session= require('express-session'); 
const exphbs = require('express-handlebars'); 
const routes = require('./controllers');
const helpers = require('./utils/helpers'); 

const sequelize = require('./config/connection'); 
const SequelizeStore= require('connect-session-sequelize')(session.Store); 

const app = express(); 
const PORT = process.env.PORT || 3001; 

const hbs = exphbs.create({ helpers }); 

const sess = {
    secret: 'Super secret secret', 
    cookie: {
        maxAge: 300000, 
        httpOnly: true,
        secure: false,  
        sameSite: 'strict',
    }, 
    resave: false, 
    saveUninitialized: true, 
    store: new SequelizeStore({
        db: sequelize
    })
}; 

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// error handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
})
.catch(err => {
    console.error('Unable to sync database: ', err);
});
>>>>>>> 5a1377c3967182e94dcc8b8e3f2c0690c24a0d03

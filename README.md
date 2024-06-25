# Room Reservation Application

## Description

A full-stack application designed to make room scheduling easy and functional.

A primary driver for creating this application was to better understand what goes into planning a versatile application.

when brainstorming the concept, we wanted it to be applicable to virtual and live spaces and be able to grow with the demands of those spaces.

Ultimately, this application helps any organization make rooms reservable online through an easy and intuitive interface so long as the spaces are free.

[what-we-learned]

## Table of Contents
- [Description](#description) 
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Examples](#examples)
- [License](#license)
- [Questions](#questions)

---

## Instalation

To install and run the Room Reservation Application locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your/repository.git
cd room-reservation-app
Install dependencies:

npm install
Set up the database:

Ensure PostgreSQL is installed and running.
Create a new database for the application.
Database configuration:

Update config/connection.js with your PostgreSQL database credentials.
Run migrations:

npx sequelize-cli db:migrate
Start the server:

sql
npm start
The application should now be running locally on http://localhost:3000.

## Usage

First, users are directed to a login page. Admin users will need to be added to your site's backend, but this class can be applied to an existing account.

On the login page, users will be prompted to enter their login info.

After this, users are directed to the room search page. Here, they can filter rooms by qualities defined by the site admins. Rooms are sorted by capacity and can be found by time availability.

Once a room has been decided upon, a user can 'click' it to navigate to the room's info page. Here, a brief description is available, and then users can reserve the space.

Reserving a space consists of entering event and host info and specifying a time.

Once a space has been reserved, an event ID is generated to be shared with others attending. This code can be searched in the home page filter to find the specific event.

Admins can add rooms to the site, alter descriptions, and define room qualities. These tools are accessible at the top of the home page and are only rendered when an admin class user is viewing the page.

## Tech Used

this project utilizes npm and jquery libraries.
specifically a nodemailer and a jquery calander handler in handlebars.

Links:
![nodemailer](https://www.npmjs.com/package/nodemailer)
![jquery-calander-code-pen](https://codepen.io/acidhorse/pen/doqzLL)
=======
- Node.js and Express.js for backend development.
- Handlebars.js for templating engine.
- PostgreSQL with Sequelize ORM for database management.
- Express-session and cookies for authentication.
- Bootstrap for responsive UI design.
- Deployed on Render for hosting.



## Features

- Room Creation and modifying
- email reminders
- admin users
- secure data
- simple layout
- templates
- scalability

## License

There is no licensing on this project

## Contribution

- Austin Seger
- Jovanna Jimenez
- Meish Hamilton
- Node.js: https://nodejs.org/docs/latest/api/
- Express.js: https://expressjs.com/en/resources/middleware.html
- Handlebars.js: https://handlebarsjs.com/
- PostgreSQL: https://www.postgresql.org/docs/
- Bootstrap: https://getbootstrap.com/
- Nodemailer: https://nodemailer.com/usage/
- Jquery Calendar in Handlebars: https://codepen.io/acidhorse/pen/doqzLL


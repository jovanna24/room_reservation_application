# Room Reservation Application

## Description

A full-stack application designed to make room scheduling easy and functional.

A primary driver for creating this application was to gain a better understanding of what goes into planning a versatile application.

when brainstorming the concept we wanted it to be applicable to virtual and live spaces and be able to grow with the demands of those spaces.

Ultimatly, this application helps any organization make rooms reservable online through an easy and intuitive interface so long as the spaces are free.

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

First, users are directed to a login page. Admin users will need to be added to your sites backend, but it is a class that can be applied to an existing account.

on the login page users will be prompted to enter their login info.

After this, users are directed to the the room serch page. Here they are able to filter rooms by qualities defined by the site admins. rooms are sorted by capacity and can be found by time availability.

Once a room has been decided upon a user can 'click' the room to navigate to the rooms info page. Here a brief description is available and then users can reserve the space.

Reserving a space consist of entering event and host info and specifying a time.

once a space has been reserved an event id is generated to be shared with others that will be attending. This code can be searched in the home page filter to find the specific event.

after this they are done.

Admins are capable of adding rooms to the site, altering descriptions, and defining room qualities. these tools are accesible at the top of the home page and are only rendered when an admin class user is viewing the page.

## Tech Used

this project utilizes npm and jquery libraries.
specifically a nodemailer and a jquery calander handler in handlebars.

Links:
![nodemailer](https://www.npmjs.com/package/nodemailer)
![jquery-calander-code-pen](https://codepen.io/acidhorse/pen/doqzLL)

## features

- Room Creation and modifying
- email reminders
- admin users
- secure data
- simple layout
- templates
- scalability

## License

There is not licencing on this project

## Contribution

- Austin Seger
- Jovanna Jimenez
- Meish Hamilton

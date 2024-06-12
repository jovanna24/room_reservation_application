const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const eventArray = JSON.parse()

class event extends Model {
  constuctor(host, contact, title, description, reservation, room) {
    this.host = host;
    this.contact = contact;
    this.title = title;
    this.description = description;
    this.reservation = reservation;
    this.room = room;
  }
}

 new Event() => {
    host: host,
    contact: contact,
    title: title,
    description: description,
    reservation: reservation,
    room: room,
 }

 function createEvent(event) {
    const newEvent = await event.create(host, contact, title, description, reservation, room);
 }
 
 export default Event

 

document.addEventListener('DOMContentLoaded', () => {
  function changeDate() {
    $('.datePicker').datepicker({
      dateFormat: 'dd MM yy',  // Format of the date display
      minDate: new Date('2024-06-17'),  // Minimum selectable date
      maxDate: new Date('2024-12-17'),  // Maximum selectable date
      onSelect: function(dateText) {
        $(this).val(dateText);  // Update input value on date selection
      },
    });
  }
  

  changeDate(); 

  const newFormHandler = async (event) => {
    event.preventDefault();
    
    const room_id = document.querySelector('#room-number').value.trim();
    const title = document.querySelector('#event-title').value.trim();
    const description = document.querySelector('#event-info').value.trim();
    const contact = document.querySelector('#contact').value.trim();
    const host = document.querySelector('#host').value.trim();
    const reservation = document.querySelector('#reservation').value.trim(); 
    const sendReminder = document.querySelector('#sendReminder').checked;
  
    console.log('Form data:', { room_id, title, description, contact, host, reservation, sendReminder });

    if (description && contact && host && reservation) {
      try {
        const response = await fetch('/api/events', {
          method: 'POST',
          body: JSON.stringify({ title, room_id, description, contact, host, reservation, sendReminder }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to place reservation!');
        }
      } catch (error) {
        console.error('Error placing reservation:', error);
        alert('Failed to place reservation!');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  const newEventForm = document.querySelector('#reservation-form');
  if (newEventForm) {
    newEventForm.addEventListener('submit', newFormHandler);
  }
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

async function main() {

  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

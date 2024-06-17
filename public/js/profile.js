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
  

  changeDate(); // Call changeDate function to initialize datepicker

  const newFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#event-info').value.trim();
    const contact = document.querySelector('#contact').value.trim();
    const host = document.querySelector('#host').value.trim();
    const reservation = document.querySelector('#reservation').value.trim(); 
    const sendReminder = document.querySelector('#sendReminder').checked;
  
    console.log('Form data:', { description, contact, host, reservation, sendReminder });

    if (description && contact && host && reservation) {
      try {
        const response = await fetch('/api/events', {
          method: 'POST',
          body: JSON.stringify({ description, contact, host, reservation, sendReminder }),
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
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

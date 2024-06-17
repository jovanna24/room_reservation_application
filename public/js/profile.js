document.addEventListener('DOMContentLoaded', () => {
  function changeDate() {
    $('.datePicker').datepicker({
      dateFormat: 'dd MM yy',
      minDate: new Date('2024-06-17'),
      maxDate: new Date('2024-12-17'),
    });
  }

  changeDate(); // Call changeDate function to initialize datepicker

  const newFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#event-info').value.trim();
    const contact = document.querySelector('#contact').value.trim();
    const host = document.querySelector('#host').value.trim(); // Ensure you have host field
    const reservation = document.querySelector('#reservation').value.trim(); // Ensure you have reservation field
  
    console.log('Form data:', { description, contact, host, reservation });

    if (description && contact && host && reservation) {
      try {
        const response = await fetch('/api/events', {
          method: 'POST',
          body: JSON.stringify({description, contact, host, reservation }),
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

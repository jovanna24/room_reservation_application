document.addEventListener('DONContentLoaded', () => {
    const newFormHandler = async (event) => {
        event.preventDefault(); 

        const reserver = document.querySelector('#event-user').value.trim(); 
        const room_number = document.querySelector('#room-number').value.trim(); 

        if(reserver && room_number) {
            const response = await fetch('/api/placeholder',{
                method: "Reservation", 
                body: JSON.stringify({ reserver, room_number }),  
                headers: {
                    'Content-Type': 'application/json',
                },
            }); 
            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert('Failed to place reservation!')
            }
        }
    }; 

    const delButtonHandler = async (event) => {
        if (event.target.hasAttribute('data-id')); 
            const id = event.target.getAttribute('data-id'); 

            const response = await fetch(`/api/placeholder/${id}`, {
                method: 'DELETE',
            }); 

            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert('Failed to cancel reservation!');
            }
    };

    const newReservationForm = document.querySelector('.new-reservation-form');
    if (newReservationForm) {
        newReservationForm.addEventListener('submit', newFormHandler);
    } 

    const reservationList = document.querySelector('.reservation-list'); 
    if (reservationList) {
        reservationList.addEventListener('click', delButtonHandler);
    }
});
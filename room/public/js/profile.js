document.addEventListener('DOMContentLoaded', () => {
    const newFormHandler = async (event) => {
        event.preventDefault(); 

        const reserver = document.querySelector('#event-user').value.trim(); 
        const room_number = document.querySelector('#room-number').value.trim(); 

        if(reserver && room_number) {
            const response = await fetch('/api/placeholder',{
                method: "POST", 
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
        if (event.target.hasAttribute('data-id')){ 
            const id = event.target.getAttribute('data-id'); 

            const response = await fetch(`/api/placeholder/${id}`, {
                method: 'DELETE',
            }); 

            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert('Failed to cancel reservation!');
            }
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
    const templateSource = document.getElementById('template-row').innerHTML;
    const template = Handlebars.compile(templateSource);
    const $html = $(template());

    function minimumDate(minDate) {
        const date = new Date(minDate);
        return date < Date.now() ? new Date(Date.now()) : date;
    }

    function maximumDate(maxDate) {
        const date = new Date(maxDate);
        return date < Date.now() ? new Date(Date.now()) : date;
    }

    $html.find('.datePicker').datepicker({  
        dateFormat: "d MM yy",
        minDate: minimumDate("2018-06-04"),
        maxDate: maximumDate("2028-07-20"),
    });

    $('body').append($html);
});
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

    var t = Handlebars.compile($('#template-row').html());
        var $html = $(t());

        function changeDate(){
        $html.find('.datePicker').datepicker({  
            minDate: minimumDate("2018-08-10"),
            maxDate: minimumDate("2018-08-15"),
        });
        }


        $html.find('.datePicker').datepicker({  
        dateFormat: "d MM yy",
        minDate: minimumDate("2018-06-04"),
        maxDate: minimumDate("2030-07-20"),
        });
        $('body').append($html);


        function minimumDate(minDate) {
            var date = new Date(minDate);
            if (date < Date.now()) {
                return new Date(Date.now());
            } else {
                return date;
            }
        }

        function maximumDate(maxDate) {
            var date = new Date(maxDate);
            if (date < Date.now()) {
            } else {
                return date;
            }
        }
});
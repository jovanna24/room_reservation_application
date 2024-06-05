document.addEventListener('DOMContentLoaded', function() {
    const rooms = document.querySelectorAll('.room');
    const resetButton = document.getElementById('reset');
    let roomData = [];

    // Load room data from local storage
    if (localStorage.getItem('roomData')) {
        roomData = JSON.parse(localStorage.getItem('roomData'));
        roomData.forEach(room => {
            const roomElement = document.querySelector(`.room[data-room-id="${room.id}"]`);
            if (room.reserved) {
                roomElement.classList.add('reserved');
            }
        });
    } else {
        // Initialize room data if not present in local storage
        rooms.forEach(room => {
            roomData.push({ id: room.getAttribute('data-room-id'), reserved: false });
        });
    }

    rooms.forEach(room => {
        room.addEventListener('mouseover', highlightRoom);
        room.addEventListener('mouseout', removeHighlight);
        room.addEventListener('click', reserveRoom);
    });

    resetButton.addEventListener('click', resetReservations);

    function highlightRoom(event) {
        if (!event.target.classList.contains('reserved')) {
            event.target.classList.add('highlighted');
        }
    }

    function removeHighlight(event) {
        event.target.classList.remove('highlighted');
    }

    function reserveRoom(event) {
        const roomElement = event.target;
        if (!roomElement.classList.contains('reserved')) {
            roomElement.classList.remove('highlighted');
            roomElement.classList.add('reserved');

            const roomId = roomElement.getAttribute('data-room-id');
            roomData = roomData.map(room => 
                room.id === roomId ? { ...room, reserved: true } : room
            );

            localStorage.setItem('roomData', JSON.stringify(roomData));
            alert(`${roomId} is now reserved.`);
        }
    }

    function resetReservations() {
        roomData = roomData.map(room => ({ ...room, reserved: false }));
        localStorage.setItem('roomData', JSON.stringify(roomData));
        rooms.forEach(room => room.classList.remove('reserved'));
        alert('All reservations have been reset.');
    }
});



document.addEventListener('DOMContentLoaded', async function() {
    const datePicker = flatpickr("#datePicker", {
        enableTime: false,
        dateFormat: "Y-m-d",
    });

    const bookingForm = document.getElementById('bookingForm');
    const selectedRoomInput = document.getElementById('selectedRoom');
    const availableTimesSelect = document.getElementById('availableTimes');
    const errorMessageDiv = document.getElementById('errorMessage');
    const successMessageDiv = document.getElementById('successMessage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    let selectedRoom = null;
    let highlightDiv = null;

    const rooms = await fetchRooms();

    const floorplanMap = document.querySelector('map[name="floorplan"]');
    rooms.forEach(room => {
        const area = document.createElement('area');
        area.shape = 'rect';
        area.coords = room.coords.split(',').map(coord => coord * 10).join(',');
        area.href = '#';
        area.alt = room.name;
        area.dataset.room = room.id;
        floorplanMap.appendChild(area);

        const option = document.createElement('option');
        option.value = room.id;
        option.textContent = room.name;
        selectedRoomInput.appendChild(option);
    });

    selectedRoomInput.addEventListener('change', function() {
        highlightRoom(this.value);
    });

    function highlightRoom(roomId) {
        selectedRoom = roomId;

        if (!selectedRoom) {
            if (highlightDiv) highlightDiv.remove();
            availableTimesSelect.innerHTML = '<option value="">Select a time</option>';
            return;
        }

        const room = rooms.find(room => room.id === selectedRoom);
        const [leftPercent, topPercent, widthPercent, heightPercent] = room.coords.split(',').map(Number);

        if (highlightDiv) highlightDiv.remove();

        const img = document.querySelector('.floor-plan-container img');
        const imgRect = img.getBoundingClientRect();

        highlightDiv = document.createElement('div');
        highlightDiv.classList.add('highlight');
        highlightDiv.style.left = `${(leftPercent / 100) * imgRect.width}px`;
        highlightDiv.style.top = `${(topPercent / 100) * imgRect.height}px`;
        highlightDiv.style.width = `${(widthPercent / 100) * imgRect.width}px`;
        highlightDiv.style.height = `${(heightPercent / 100) * imgRect.height}px`;
        highlightDiv.style.position = 'absolute';
        document.querySelector('.floor-plan-container').appendChild(highlightDiv);

        selectedRoomInput.value = selectedRoom;
        availableTimesSelect.innerHTML = '<option value="">Select a time</option>';
    }

    datePicker.config.onChange.push(async function(selectedDates) {
        const selectedDate = selectedDates[0].toISOString().split('T')[0];

        if (!selectedRoom) {
            showError('Please select a room first.');
            return;
        }

        showLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/available?room=${selectedRoom}&date=${selectedDate}`);
            if (!response.ok) {
                throw new Error('Failed to fetch available times.');
            }
            const availableTimes = await response.json();

            availableTimesSelect.innerHTML = '<option value="">Select a time</option>';
            availableTimes.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                availableTimesSelect.appendChild(option);
            });
            clearMessages();
        } catch (error) {
            showError('Failed to fetch available times.');
        } finally {
            showLoading(false);
        }
    });

    bookingForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const selectedDate = datePicker.input.value;
        const selectedTime = availableTimesSelect.value;

        if (!selectedRoom) {
            showError('Please select a room.');
            return;
        }

        if (!selectedDate) {
            showError('Please select a date.');
            return;
        }

        if (!selectedTime) {
            showError('Please select a time.');
            return;
        }

        const selectedDateTime = `${selectedDate} ${selectedTime}`;

        showLoading(true);
        try {
            const response = await fetch('http://localhost:3000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ room: selectedRoom, dateTime: selectedDateTime })
            });

            if (response.status === 200) {
                showSuccess('Room booked successfully!');
            } else if (response.status === 400) {
                const errorText = await response.text();
                showError(errorText);
            } else {
                showError('An unknown error occurred.');
            }
        } catch (error) {
            showError('Failed to book the room. Please try again.');
        } finally {
            showLoading(false);
        }
    });

    function showError(message) {
        errorMessageDiv.textContent = message;
        successMessageDiv.textContent = '';
    }

    function showSuccess(message) {
        successMessageDiv.textContent = message;
        errorMessageDiv.textContent = '';
    }

    function clearMessages() {
        errorMessageDiv.textContent = '';
        successMessageDiv.textContent = '';
    }

    function showLoading(isLoading) {
        loadingIndicator.classList.toggle('visible', isLoading);
    }

    async function fetchRooms() {
        const response = await fetch('http://localhost:3000/rooms');
        return response.json();
    }

    window.addEventListener('resize', () => {
        if (selectedRoom) {
            highlightRoom(selectedRoom);
        }
    });
});

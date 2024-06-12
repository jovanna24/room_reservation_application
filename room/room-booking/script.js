document.addEventListener("DOMContentLoaded", async function () {
  const datePicker = flatpickr("#datePicker", {
    enableTime: false,
    dateFormat: "Y-m-d",
  });

  const bookingForm = document.getElementById("bookingForm");
  const selectedRoomInput = document.getElementById("selectedRoom");
  const availableTimesSelect = document.getElementById("availableTimes");
  const errorMessageDiv = document.getElementById("errorMessage");
  const successMessageDiv = document.getElementById("successMessage");
  const loadingIndicator = document.getElementById("loadingIndicator");
  let selectedRoom = null;
  let highlightDiv = null;

    const rooms = [
        { id: 'office116', name: 'Office 116', coords: '57.5,32.2,15,17' },
        { id: 'office115', name: 'Office 115', coords: '57.7,50,15,18' },
        { id: 'conferenceRoom', name: 'Conference Room', coords: '27.1,32.2,19.6,35.5' },
        { id: 'office112', name: 'Office 112', coords: '6.5,43,14.5,17' },
        { id: 'office111', name: 'Office 111', coords: '6.5,25,14.5,17.7' },
        { id: 'office110', name: 'Office 110', coords: '6.5,6.6,22.5,18' },
        { id: 'office109', name: 'Office 109', coords: '29.6,6.6,17.3,18' },
        { id: 'office108', name: 'Office 108', coords: '47.4,6.6,19,18' },
        { id: 'office107', name: 'Office 107', coords: '73,6.6,12,18' },
        { id: 'office106', name: 'Office 106', coords: '79,25,14,27' },
        { id: 'office105', name: 'Office 105', coords: '79,52,14,21.2' },
        { id: 'office104', name: 'Office 104', coords: '76.6,74,17,19.3' },
        { id: 'office103', name: 'Office 103', coords: '52,75,24,18' },
        { id: 'office102', name: 'Office 102', coords: '27.1,75,24,18' },
    ];

  const floorplanMap = document.querySelector('map[name="floorplan"]');
  rooms.forEach((room) => {
    const area = document.createElement("area");
    area.shape = "rect";
    area.coords = room.coords
      .split(",")
      .map((coord) => coord * 10)
      .join(",");
    area.href = "#";
    area.alt = room.name;
    area.dataset.room = room.id;
    floorplanMap.appendChild(area);

    const option = document.createElement("option");
    option.value = room.id;
    option.textContent = room.name;
    selectedRoomInput.appendChild(option);

    area.addEventListener("click", function (event) {
      event.preventDefault();
      highlightRoom(room.id);
    });
  });

  selectedRoomInput.addEventListener("change", function () {
    highlightRoom(this.value);
  });

  function highlightRoom(roomId) {
    selectedRoom = roomId;

    if (!selectedRoom) {
      if (highlightDiv) highlightDiv.remove();
      availableTimesSelect.innerHTML =
        '<option value="">Select a time</option>';
      return;
    }

    const room = rooms.find((room) => room.id === selectedRoom);
    const [leftPercent, topPercent, widthPercent, heightPercent] = room.coords
      .split(",")
      .map(Number);

    if (highlightDiv) highlightDiv.remove();

    const img = document.querySelector(".floor-plan-container img");
    const imgRect = img.getBoundingClientRect();

    highlightDiv = document.createElement("div");
    highlightDiv.classList.add("highlight");
    highlightDiv.style.left = `${(leftPercent / 100) * imgRect.width}px`;
    highlightDiv.style.top = `${(topPercent / 100) * imgRect.height}px`;
    highlightDiv.style.width = `${(widthPercent / 100) * imgRect.width}px`;
    highlightDiv.style.height = `${(heightPercent / 100) * imgRect.height}px`;
    document.querySelector(".floor-plan-container").appendChild(highlightDiv);

    selectedRoomInput.value = selectedRoom;
    availableTimesSelect.innerHTML = '<option value="">Select a time</option>';
  }

  datePicker.config.onChange.push(async function (selectedDates) {
    const selectedDate = selectedDates[0].toISOString().split("T")[0];

    if (!selectedRoom) {
      showError("Please select a room first.");
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

  bookingForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const selectedDate = datePicker.input.value;
    const selectedTime = availableTimesSelect.value;

    if (!selectedRoom) {
      showError("Please select a room.");
      return;
    }

    if (!selectedDate) {
      showError("Please select a date.");
      return;
    }

    if (!selectedTime) {
      showError("Please select a time.");
      return;
    }

    const selectedDateTime = `${selectedDate} ${selectedTime.split(" - ")[0]}`;

    showLoading(true);
    try {
      const response = await fetch("http://localhost:3000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room: selectedRoom,
          dateTime: selectedDateTime,
        }),
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
    successMessageDiv.textContent = "";
  }

  function showSuccess(message) {
    successMessageDiv.textContent = message;
    errorMessageDiv.textContent = "";
  }

  function clearMessages() {
    errorMessageDiv.textContent = "";
    successMessageDiv.textContent = "";
  }

  function showLoading(isLoading) {
    loadingIndicator.classList.toggle("visible", isLoading);
  }

  async function fetchRooms() {
    const response = await fetch("http://localhost:3000/rooms");
    return response.json();
  }

  window.addEventListener("resize", () => {
    if (selectedRoom) {
      highlightRoom(selectedRoom);
    }
  });
});

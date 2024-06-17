const roomsTiles = document.querySelector("#roomsTiles-section");
const roomOptions = JSON.parse(localStorage.getItem("roomArray")) || [];

let roomCard = "";
roomOptions.forEach((room) => {
  roomCard += `
    <div class=room-card">
    <h2>${room.title}</h2>
    // <!--this is intended to be the room image but not sure how to fererence one-->
    <p>${room.id}</p>
    <p>${room.features}</p>
    </div>

`;
  roomsTiles.innerHTML = roomCard;
});

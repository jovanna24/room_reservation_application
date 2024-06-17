document.querySelector(".new-room-form").addEventListener('submit', (event)=>{
    event.preventDefault()

    const post_id = window.location.href.split("/")[4];
    const room_text = document.querySelector("#room-content").value

    fetch('/api/rooms', {
        method: "POST",
        body: JSON.stringify({
            room_text: room_text,
            post_id: post_id
        }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
        if(res.status == 200) {
            console.log("room has been added!")
            window.location.reload();
        } else {
            console.log("An error has occured")
        }
    })
});
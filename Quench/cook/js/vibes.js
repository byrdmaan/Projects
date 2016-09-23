var vibe = document.getElementById("rec_song");

function playVibe() {
    vibe.play();
    $("#rec_song").prop("volume", 0.25);
}

function pauseVibe() {
    vibe.pause();
}
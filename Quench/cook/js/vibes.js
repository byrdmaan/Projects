var vibe = document.getElementById("rec_song");

function playVibe() {
    vibe.play();
    $("#rec_song").prop("volume", 0.25);
    $('#play_button').prop('disabled', true);
    $('#pause_button').prop('disabled', false);
}

function pauseVibe() {
    vibe.pause();
    $('#play_button').prop('disabled', false);
    $('#pause_button').prop('disabled', true);
}
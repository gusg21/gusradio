var currentHowl = null;
var currentSong = null;

class Song {
  constructor(element) {
    this.path = element.getAttribute("data-filepath");
    this.name = element.getAttribute("data-name");
    this.artist = element.getAttribute("data-artist");
  }

  getNiceName() {
    return currentSong.name + " - " + currentSong.artist;
  }
}

function isPlaying() {
  return currentHowl && currentHowl.playing();
}

function updatePlayer() {
  // let player = document.querySelector(".player");
  let playButton = document.querySelector(".play-button");
  let playButtonIcon = playButton.children.item(0);
  let songDisplay = document.querySelector(".player-song-display");

  if (isPlaying()) {
    playButtonIcon.classList.remove("bi-play");
    playButtonIcon.classList.add("bi-pause");

    songDisplay.innerHTML = currentSong.getNiceName();
  } else {
    playButtonIcon.classList.remove("bi-pause");
    playButtonIcon.classList.add("bi-play");

    songDisplay.innerHTML = "";
  }

  document.querySelectorAll("tr.track").forEach((element) => {
    let songName = element.getAttribute("data-name");

    if (isPlaying() && songName === currentSong.name) {
      element.classList.add("table-active");
    } else {
      element.classList.remove("table-active");
    }
  });
}

function playSong(song) {
  currentSong = song;

  if (isPlaying()) {
    currentHowl.stop();
  }

  let path = "/static/audio/" + song.path;
  currentHowl = new Howl({
    src: [path],
    // preload: false,
    html5: true,
  });

  currentHowl.on("play", function() {
    updatePlayer();
  });

  currentHowl.on("pause", function() {
    updatePlayer();
  });

  currentHowl.on("stop", function() {
    updatePlayer();
  });

  // Clear listener after first call.
  currentHowl.once("load", function () {
    currentHowl.play();
  });
}

function initApp() {
  document.querySelectorAll(".play-track-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      playSong(new Song(event.target));
    });
  });

  document.querySelector(".play-button").addEventListener("click", function(event){
    if (isPlaying()) {
      currentHowl.stop();
    } else {
      alert("not implemented");
    }
  });

  updatePlayer();
}

window.onload = initApp;

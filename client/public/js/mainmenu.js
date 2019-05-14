var audio = new Audio('../music/music.mp3');

document.addEventListener('keydown', function(event) {
  if(event.keyCode == 49) {
    window.location = "/trail";
  }else if (event.keyCode == 51) {
    window.location = "/topten";
  }
});

function start(){
  window.location = "/setup";
}

function learn(){
  window.location = "/setup";
}

function topTen(){
  window.location = "/topten";
}

function soundOn(div){
  div.removeAttribute("onclick");
  var promise = audio.play();

  if (promise !== undefined) {
       promise.then(_ => {
       // Autoplay started!
   }).catch(error => {
      // Autoplay was prevented.
      // Show a "Play" button so that user can start playback.
    });
  }
  div.setAttribute("onclick", "soundOff(this)");
}

function soundOff(div){
  div.removeAttribute("onclick");
  var promise = audio.pause();

  if (promise !== undefined) {
       promise.then(_ => {
       // Autoplay started!
   }).catch(error => {
      // Autoplay was prevented.
      // Show a "Play" button so that user can start playback.
    });
  }
  div.setAttribute("onclick", "soundOn(this)");
}

document.addEventListener('keydown', function(event){
  if(event.keyCode == 32){
    window.location = "/mainmenu";
  }
});

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

//function blink() {
   //var f = document.getElementById('msg');
   //setInterval(function() {
      //f.style.display = (f.style.display == 'none' ? '' : 'none');
  // }, 1000);
//}

//blink();

function mainmenu(){
  window.location = "/mainmenu";
}

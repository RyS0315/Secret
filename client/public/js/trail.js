document.addEventListener('keydown', function(event){
  if(event.keyCode == 32){
   
  }
});

function blink() {
   var f = document.getElementById('msg');
   setInterval(function() {
      f.style.display = (f.style.display == 'none' ? '' : 'none');
   }, 1000);
}

blink();

function mainmenu(){
  window.location = "/mainmenu";
}



var trailStats = function (){
  fetch('/api/game/data')
  .then(function(response){
    if(response.status !== 200) {
      console.log('Issue! status:' + response.status);
      return;
    }

    response.json().then(function(data) {
      console.log(data);
      var wagon= data.milesTraveled / 5;
      //document.getElementById('PICTURE of wagon').style.right = wagon + "%"

      // document.getElementById('field').innerHTML = data.currentTerrain.name;
      document.getElementById('days').innerHTML = data.daysOnTrail;
      document.getElementById('money').innerHTML = data.playerMoney;
      document.getElementById('profession').innerHTML = data.playerProfession;
      document.getElementById('miles').innerHTML = data.milesTraveled;
      document.getElementById('weather').innerHTML = data.currentWeather.weatherName;
      document.getElementById('health').innerHTML = data.groupHealth;
      document.getElementById('pace').innerHTML = data.currentPace.paceName;
      document.getElementById('terrain').innerHTML = data.currentTerrain.terrainName;
      document.getElementById('members').innerHTML = data.playerStatus;
    })
  })
}

function nextDay(){
  fetch('/api/game/updateGame')
  .then(function(response) {
    if (response.status !== 200) {
      return;
    }
    response.json().then(function(data){

    });
  });
}

function changePace(id){
  fetch('/api/pace/' + id,
  {
    method: 'post',
    headers:
    {
      "Content-type": "application/json; charset=UTF-8"
    },
  }).then(function(response) {
    if (response.status !== 200) {
      console.log('ok' + response.status +"msg: ");
      return;
  }
  response.json().then(function(data){
    document.getElementById('pace').innerHtml = data.name
    });
  });
}


window.addEventListener("keydown", userPaceChange, false);

function userPaceChange(key){
  if( key.keyCode == "8"){
    window.location.href = "/mainmenu"
    }
    else if (key.keyCode == "49"){
    changePace(0);
    }
    else if (key.keyCode == "50"){
    changePace(1);
    }
    else if (key.keyCode == "51"){
    changePace(2);
    }
    else if (key.keyCode == "52"){
    changePace(3);
    }
    else if (key.keyCode == "32"){
    nextDay();
    trailStats();
    }
}
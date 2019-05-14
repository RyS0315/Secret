// document.addEventListener('keydown', function(event){
//   if(event.keyCode == 32) {
    
//   }
// });
var step = 0;
getScreen(step);


function getScreen(screenId) {
	fetch('/api/setup/screen/' + screenId).then(
		function(response) {
			response.text().then(function(data) {
					console.log('success! ' + data);
					updateDiv(data);
			});
		},
		function() {
			console.log('failure of ajax_info.txt call!');
		}
	);
}

function updateDiv(content) {
  var div = document.getElementById('screen');
  div.innerHTML = content;
}

function mainmenu(){
  window.location = "/mainmenu";
}

function saveProfession(profession) {

  fetch('/api/setup/profession/' + profession,
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: '{"profession": "' + profession + '"}'
      }).then(function(response) {
        if (response.status !== 200) {
          console.log('ok' + response.status +"msg: " + response.value);
          return;
        }
        else{
					step ++;
          getScreen(step);
        }
        console.log("profession" + profession + " saved! ");
      });
}


function saveWagonLeader() {
  var name1 = document.getElementById("player0").value

  fetch('/api/setup/wagonLeader/' + name1,
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: '{"name1": "' + name1 + '"}'
      }).then(function(response) {
        if (response.status !== 200) {
          console.log('ok' + response.status +"msg: " + response.value);
          return;
        }
        else{
          step++;
          getScreen(step);
        }
        console.log("name1" + name1 + "is saved");
      });

}

function saveWagonMembers (){
  var name2 = document.getElementById("player1").value
  var name3 = document.getElementById("player2").value
  var name4 = document.getElementById("player3").value
  var name5 = document.getElementById("player4").value

  fetch('/api/setup/member/' + name2 + '/' + name3 + '/' + name4 + '/' + name5,
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(function(response) {
        if (response.status !== 200) {
          console.log('ok' + response.status +"msg: " + response.value);
          return;
        }
        else{
          step++
          getScreen(step);
        }
        console.log("wagon leader name saved");
      });
}

function setMonth (month){
  fetch('/api/setup/month/' + month,
      {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: '{"month": "' + month + '"}'
      }).then(function(response) {
        if (response.status !== 200) {
          console.log('ok' + response.status +"msg: " + response.value);
          return;
        }
        else{
					step ++;
          getScreen(step);
          returnStats();
        }
        console.log("month" + month + " saved! ");
      });
}

var returnStats = function (){

  fetch ('/api/game/data/')
  .then(function(response) {
		console.log('ok' + response.status +"msg: " + response.value);
    if (response.status !== 200) {
      return;
}

response.json().then(function(data) {
  console.log(data);
  document.getElementById('rProfession').innerHTML = "<p> Your Profession: " + data.playerProfession+" </p>";
  document.getElementById('rMoney').innerHTML = "<p> Bank Account: " + data.playerMoney + " </p>";
  document.getElementById('rPlayer1Name').innerHTML = "<p> Wagon Leader: " + data.playerNames[0] + " </p>";
  document.getElementById('rPlayer2Name').innerHTML = "<p> Wagon Member 1: " + data.playerNames[1] + " </p>";
  document.getElementById('rPlayer3Name').innerHTML = "<p> Wagon Member 2: " + data.playerNames[2] + " </p>";
  document.getElementById('rPlayer4Name').innerHTML = "<p> Wagon Member 3: " + data.playerNames[3] + " </p>";
  document.getElementById('rPlayer5Name').innerHTML = "<p> Wagon Member 4: " + data.playerNames[4] + " </p>";
	document.getElementById('rMonth').innerHTML = "<p> Start Month: " + data.startMonth + " </p>";
	blink();
	document.addEventListener('keydown', function(event){
		if(event.keyCode == 32){
			window.location = "/trail";
		}
	});
    })
  })
}

function blink() {
	var f = document.getElementById('pressSpace');
	setInterval(function() {
		 f.style.display = (f.style.display == 'none' ? '' : 'none');
	}, 1000);
}
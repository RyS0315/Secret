var gameData = require('../models/gameData');
var gameController = require("./gameController.js");

// var gameController = require('./gameController.js');
exports.createGameObject = function(){
  var newGame = gameData.getData();
  return newGame;
}

gameStats = gameData.getData();

// exports.currentData = gameData.getData();
//
// exports.setPlayerNames = function(req, res) {
//     exports.currentData.playerNames.push(req.params.names);
//     res.setHeader('Content-Type', 'application/json');
//     console.log(exports.currentData);
//     res.send(exports.currentData.playerNames);
// }
//
// exports.setProfession = function(req, res) {
//     var chosen = professions.getAllProfessions()[req.params.id];
//     console.log(chosen);
//     exports.currentData.playerProfession = chosen.name;
//     exports.currentData.playerMoney = chosen.money;
//     res.setHeader('Content-Type', 'application/json');
//     console.log(exports.currentData);
//     res.send(exports.currentData.playerProfession + ", " + exports.currentData.playerMoney);
// }
//
// var months = ["March", "April", "May", "June", "July"];
//
// exports.setStartMonth = function(req, res) {
//     exports.currentData.startMonth = months[req.params.id];
//     res.setHeader('Content-Type', 'application/json');
//     console.log(exports.currentData);
//     res.send(exports.currentData.startMonth)
// }

exports.setupScreens = [];

var screen1 = 
        "<h3>Choose your Profession</h3>"
         + "<ol id=\"setupQuestions1\" >"
         + "<li id=\"bankerMenuItem\" onclick='saveProfession(\"Banker\")'>Be a banker from Boston</li>"
         + "<li id=\"carpenterMenuItem\"  onclick='saveProfession(\"Carpenter\")'>Be a carpenter from Ohio</li>"
         + "<li id=\"farmerMenuItem\" onclick='saveProfession(\"Farmer\")'>Be a farmer from Illinois</li>"
         + "</ol>";

var screen2 = "<h3>What is the first name of the wagon leader?</h3>"
         + " <input type=\"text\" id=\"player0\" value=\"\"/>"
         + "<input type=\"button\" class=\"button-1\" id=\"page1sub\" value=\"next\" onclick = saveWagonLeader() />";

var screen3 = "<h3>What are the first names of the other members of your party?</h3>"
         + "<p>Player Name: <input id=\"player1\" /></p>"
                  + "<p>Player Name: <input id=\"player2\" /></p> "
                  + "<p>Player Name: <input id=\"player3\" /></p>"
                  + "<p>Player Name: <input id=\"player4\" /></p \>"
                  + "<input type=\"button\" class=\"button-1\" id=\"page2sub\" value=\"Next\" onclick = saveWagonMembers() />";

 var screen4 = "<h3>Choose your start month:.</h3>"
                  + "<ol id=\"setupQuestions4\" >"
                  + "<li onclick=\"setMonth('March')\" id=\"marchOption\">March</li>"
                  + "<li onclick=\"setMonth('April')\" id=\"aprilOption\">April</li>"
                  + "<li onclick=\"setMonth('May')\" id=\"mayOption\">May</li>"
                  + "<li onclick=\"setMonth('June')\" id=\"juneOption\">June</li>"
                  + "<li onclick=\"setMonth('July')\" id=\"julyOption\">July</li>"
                  + "</ol>"
                  + "<div id=\"selectedOption\">What is your choice?</div>";

var screen5 = "<h3>Congratulations! You are ready to start the mission</h3>"
         + "<p>Here are settings you selected for the game</p>"
         + "<div id=\"returnData\">"
         + "<span id=\"rPlayer1Name\"></span><br />"
         + "<span id=\"rPlayer2Name\"></span><br />"
         + "<span id=\"rPlayer3Name\"></span><br />"
         + "<span id=\"rPlayer4Name\"></span><br />"
         + "<span id=\"rPlayer5Name\"></span><br />"
         + "<span id=\"rProfession\"></span><br />"
         + "<span id=\"rMoney\"></span><br />"
         + "<span id=\"rMonth\"></span><br />"
         + "<h2 id=\"pressSpace\">Press the space to go to trail.</h2>"
         + "</div>";

exports.saveStartMonth = function(req, res) {
  gameController.getData().startMonth = req.body.month;
  res.setHeader('Content-Type','text/plain');
  res.send(gameController.getData(startMonth));
}

exports.setupScreens.push(screen1);
exports.setupScreens.push(screen2);
exports.setupScreens.push(screen3);
exports.setupScreens.push(screen4);
exports.setupScreens.push(screen5);

exports.getSetupScreen = function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(exports.setupScreens[req.params.id]);
}

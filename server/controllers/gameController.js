var gameData = require('../models/gameData');
var pace = require('../models/pace');
var terrain = require('../models/terrain');
var weather = require('../models/weather');
// var setupController = require('./setupController.js');



currentData = gameData.getData();

exports.setProfession = function(req, res){
    gameStats.playerProfession = req.params.profession;
    if (gameStats.playerProfession == "Banker"){
      gameStats.playerMoney = 2000;
    }
    else if (gameStats.playerProfession == "Carpenter"){
      gameStats.playerMoney = 1800;
    }
    else if (gameStats.playerProfession == "Farmer"){
      gameStats.playerMoney = 1500;
    }
    res.setHeader('Content-Type', 'text/plain');
    res.send(gameStats.playerProfession);
}

exports.setLeader = function(req, res){
    gameStats.playerNames[0] = req.params.name1;
    res.setHeader('Content-Type', 'text/plain');
    res.send(gameStats.playerNames);
}

exports.setMembers = function(req, res){
    gameStats.playerNames[1] = req.params.name2;
    gameStats.playerNames[2] = req.params.name3;
    gameStats.playerNames[3] = req.params.name4;
    gameStats.playerNames[4] = req.params.name5;
    res.setHeader('Content-Type', 'text/plain');
    res.send(gameStats.playerNames);
}

exports.setMonth = function(req, res){
    gameStats.startMonth = req.params.month;
    res.setHeader('Content-Type', 'text/plain');
    res.send(gameStats.startMonth);
}

exports.getGameData = function(req, res) {
    //console.log(gameData)
    gamestats = req.params;
    res.setHeader('Content-Type', 'application/json');
    res.send(gameStats);
    return(gameStats);
}

exports.getData = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(exports.currentData);
}

exports.updateGameData = function(req, res) {
    exports.currentData.currentTerrain = terrain.getTerrain();
    if(exports.currentData.currentTerrain.name == "Mountains") {
        exports.currentData.currentWeather = weather.getMountainsWeather();
    } else if(exports.currentData.currentTerrain.name == "Grassland") {
        exports.currentData.currentWeather = weather.getGrasslandWeather();
    } else if(exports.currentData.currentTerrain.name == "Plains") {
        exports.currentData.currentWeather = weather.getPlainsWeather();
    } else if(exports.currentData.currentTerrain.name == "Forest") {
        exports.currentData.currentWeather = weather.getForestWeather();
    } else if(exports.currentData.currentTerrain.name == "Desert") {
            exports.currentData.currentWeather = weather.getDesertWeather();
    }
    //exports.currentData.currentWeather = weather.getRandomWeather();

    exports.currentData.daysOnTrail++;
    exports.currentData.milesTraveled += Math.floor(exports.currentData.currentPace.miles * exports.currentData.currentWeather.miles);
    exports.currentData.groupHealth += exports.currentData.currentWeather.health;
    exports.currentData.groupHealth += exports.currentData.currentPace.health;
    if(exports.currentData.daysOnTrail >= 45) {
        exports.currentData.messages = "ya took too long and now yer ded";
        exports.currentData.groupHealth = 0;
        exports.currentData.playerStatus = [true, true, true, true, true];
    }
    if(exports.currentData.milesTraveled >= 500) {
        exports.currentData.messages = "wow, u really went and did it";
    }
    if(exports.currentData.groupHealth > 100) {
        exports.currentData.groupHealth = 100;
    }

    var deathRoll = Math.floor(Math.random() * 100) + 1;
    if(exports.currentData.groupHealth <= 0) {
        exports.currentData.playerStatus = [true, true, true, true, true];
        exports.currentData.messages = "Everyone in your party is dead, you loose."
    } else if(exports.currentData.groupHealth < 20) {
        if(deathRoll <= 10) {
            var i = 4;
            while(exports.currentData.playerStatus[i] == true) {
                i--;
            }
            exports.currentData.playerStatus[i] = true;
            exports.currentData.messages = "A member of your party has died.";
        }
    } else if(exports.currentData.groupHealth < 50) {
        if(deathRoll <= 3) {
            var i = 4;
            while(exports.currentData.playerStatus[i] == true) {
                i--;
            }
            exports.currentData.playerStatus[i] = true;
            exports.currentData.messages = "A member of your party has died.";
        }
    } else {
        exports.currentData.messages = "Another day on the trail...";
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.currentData);
}

exports.getPace = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.currentData.currentPace);
}

exports.setPace = function(req, res) {
    console.log("Changed pace to: " + pace.getAllPaces()[req.params.id].name);
    exports.currentData.currentPace = pace.getAllPaces()[req.params.id];
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.currentData.currentPace);
}

exports.resetGameData = function(req, res) {
    exports.currentData = gameData.getData();
    res.setHeader('Content-Type', 'application/json');
    console.log(exports.currentData);
    res.send(exports.currentData);
}


var currentTerrain = []; // the array that contains top ten scores at that time
currentTerrain1 = terrain.getAllTerrains("Mountains", "/images/mountain.gif", -5);
currentTerrain2 = terrain.getAllTerrains("Grassland", "/images/field.gif", +5);
currentTerrain3 = terrain.getAllTerrains("Plains", "/images/greatplains.jpg", +5);
currentTerrain4 = terrain.getAllTerrains("Forrest", "", 0);
currentTerrain5 = terrain.getAllTerrains("Mountains", "/images/mountain.gif", -5);

currentTerrain.push(currentTerrain1);
currentTerrain.push(currentTerrain2);
currentTerrain.push(currentTerrain3);
currentTerrain.push(currentTerrain4);
currentTerrain.push(currentTerrain5);

// exports.currentTerrain.push(terrain.terrainOptions("Mountains", "mountain.gif", -5));

function weightedTerrains(){
    var terrainWeights =[];
  for (var i=0; i<100;i++){
    if(i<19){
      terrainWeights[i]=currentTerrain1;
      //gameStats.milesTraveled -= 5
    }
    else if(i>=19 && i<=39){
      terrainWeights[i]=currentTerrain2
      //gameStats.milesTraveled += 5
    }
    else if(i>=39 && i<=59){
      terrainWeights[i]=currentTerrain3
      //gameStats.milesTraveled += 5
    }
    else if(i>=59 && i<=79){
      terrainWeights[i]=currentTerrain4
    }
    else if(i>=79 && i<=99){
      terrainWeights[i]=currentTerrain5
      //gameStats.milesTraveled += -5
    }

  }
  var randomTerrain = Math.floor(Math.random() * 100);
  return terrainWeights[randomTerrain];

}

exports.getCurrentTerrains = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(currentTerrain);
}

var currentWeather = []; // the array that contains top ten scores at that time
currentWeather1 = weather.getAllWeathers(1, "Very Hot", -8, .7, .1);
currentWeather2 = weather.getAllWeathers(2, "Hot", -3, .9, .1);
currentWeather3 = weather.getAllWeathers(3, "Warm", +1, 1, .2);
currentWeather4 = weather.getAllWeathers(4, "Cool", +1, .95, .1);
currentWeather5 = weather.getAllWeathers(5, "Cold", -5, .8, .1);
currentWeather6 = weather.getAllWeathers(6, "Very Cold", -12, .7, .1);
currentWeather7 = weather.getAllWeathers(7, "Rain", -4, .6, .1);
currentWeather8 = weather.getAllWeathers(8, "Heavy Rain", -8, .4, .05);
currentWeather9 = weather.getAllWeathers(9, "Snow", -15, .3, .05);
currentWeather10 = weather.getAllWeathers(10, "Blizzard", -30, .1, .05);
currentWeather11 = weather.getAllWeathers(11, "Heavy Fog", -3, .5, .05);

currentWeather.push(currentWeather1);
currentWeather.push(currentWeather2);
currentWeather.push(currentWeather3);
currentWeather.push(currentWeather4);
currentWeather.push(currentWeather5);
currentWeather.push(currentWeather6);
currentWeather.push(currentWeather7);
currentWeather.push(currentWeather8);
currentWeather.push(currentWeather9);
currentWeather.push(currentWeather10);
currentWeather.push(currentWeather11);

// exports.currentWeather.push(weather.weatherOptions(1, "Very Hot", -8, .7, .1));

weightedWeather = function (){
    var weights =[];

  for (var i=0; i<100;i++){
    if(i<10){
        weights[i]=currentWeather1;
        //gameStats.milesTraveled *= .7;
    }
    else if(i>=10 && i<=19){
      weights[i]=currentWeather2
      //gameStats.milesTraveled *= .9;
    }
    else if(i>=19 && i<=39){
      weights[i]=currentWeather3
    }
    else if(i>=39 && i<=49){
      weights[i]=currentWeather4
      //gameStats.milesTraveled *= .95;
    }
    else if(i>=49 && i<=59){
      weights[i]=currentWeather5
      //gameStats.milesTraveled *= .8;
    }
    else if(i>=59 && i<=69){
      weights[i]=currentWeather6
      //gameStats.milesTraveled *= .7;
    }
    else if(i>=69 && i<=79){
      weights[i]=currentWeather7
      //gameStats.milesTraveled *= .6;
    }
    else if(i>=79 && i<=84){
      weights[i]=currentWeather8
      //gameStats.milesTraveled *= .4;
    }
    else if(i>=84 && i<=89){
      weights[i]=currentWeather9
      //gameStats.milesTraveled *= .3;
    }
    else if(i>=89 && i<=94){
      weights[i]=currentWeather10
      //gameStats.milesTraveled *= .1;
    }
    else if(i>=94 && i<=99){
      weights[i]=currentWeather11
      //gameStats.milesTraveled *= .5;
    }
  }
  var random = Math.floor(Math.random() * 100);
  return weights[random];
}

// GET WEATHER

exports.getCurrentWeathers = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(weightedWeather());
}


exports.updateGameData = function(req, res) {
    //console.log(gameStats)
    if(gameStats.groupHealth >= 20 && gameStats.groupHealth <50) {
      for (var i = 0; i < gameStats.playerStatus.length; i++){
        var random = Math.floor(Math.random() * 100 + 1);
        if (random <= 3){
          gameStats.playerStatus[i] = false;
          gameStats.messages.push(gameStats.playerNames[i] + "has died")
        }
      }

    }
    else if(gameStats.groupHealth >= 0 && gameStats.groupHealth < 20){
      for (var i = 0; i < gameStats.playerStatus.length; i++){
        var random = Math.floor(Math.random() * 100 + 1);
        if (random <= 10){
          gameStats.playerStatus[i] = false;
          gameStats.messages.push(gameStats.playerNames[i] + "has died")
    }
    else if(gameStats.groupHealth <= 0){
      for (var i = 0; i < gameStats.playerStatus.length; i++) {
        gameStats.playerStatus[i] = false;
          }
          gameStats.messages.push("all players have died")
        }
      }
    }
    updateHealth();
    gameStats.milesTraveled += updateMiles();
    gameStats.daysOnTrail++;
    //gameStats.playerProfession = pickProfession();
    gameStats.currentWeather = weightedWeather();
    gameStats.currentTerrain = weightedTerrains();
    //gameStats.startMonth =
    res.setHeader('Content-Type', 'application/json');
    res.send(gameStats)
  }
function weather(id, type, health, miles, prob) {
    this.id = id;
    this.type = type;
    this.health = health;
    this.miles = miles;
    this.prob = prob;
}

var allWeathers = []
allWeathers.push(new weather(0, "Very Hot", -8, .7, 10));
allWeathers.push(new weather(1, "Hot", -3, .9, 10));
allWeathers.push(new weather(2, "Warm", 1, 1, 20));
allWeathers.push(new weather(3, "Cool", 1, .95, 10));
allWeathers.push(new weather(4, "Cold", -5, .8, 10));
allWeathers.push(new weather(5, "Very Cold", -12, .7, 10));
allWeathers.push(new weather(6, "Rain", -4, .6, 10));
allWeathers.push(new weather(7, "Heavy Rain", -8, .4, 5));
allWeathers.push(new weather(8, "Snow", -15, .3, 5));
allWeathers.push(new weather(9, "Blizzard", -30, .1, 5));
allWeathers.push(new weather(10, "Heavy Fog", -3, .5, 5));

var plainsWeathers = []
plainsWeathers.push(new weather(1, "Hot", -3, .9, 10));
plainsWeathers.push(new weather(2, "Warm", 1, 1, 30));
plainsWeathers.push(new weather(3, "Cool", 1, .95, 40));
plainsWeathers.push(new weather(4, "Cold", -5, .8, 10));
plainsWeathers.push(new weather(6, "Rain", -4, .6, 10));

var forestWeathers = []
forestWeathers.push(new weather(2, "Warm", 1, 1, 30));
forestWeathers.push(new weather(3, "Cool", 1, .95, 40));
forestWeathers.push(new weather(4, "Cold", -5, .8, 10));
forestWeathers.push(new weather(6, "Rain", -4, .6, 10));
forestWeathers.push(new weather(7, "Heavy Rain", -8, .4, 5));
forestWeathers.push(new weather(10, "Heavy Fog", -3, .5, 5));

var mountainWeathers = []
mountainWeathers.push(new weather(3, "Cool", 1, .95, 20));
mountainWeathers.push(new weather(4, "Cold", -5, .8, 30));
mountainWeathers.push(new weather(5, "Very Cold", -12, .7, 30));
mountainWeathers.push(new weather(8, "Snow", -15, .3, 10));
mountainWeathers.push(new weather(9, "Blizzard", -30, .1, 10));

var desertWeathers = []
desertWeathers.push(new weather(0, "Very Hot", -8, .7, 20));
desertWeathers.push(new weather(1, "Hot", -3, .9, 20));
desertWeathers.push(new weather(2, "Warm", 1, 1, 40));
desertWeathers.push(new weather(3, "Cool", 1, .95, 15));
desertWeathers.push(new weather(4, "Cold", -5, .8, 5));

exports.getRandomWeather = function() {
    var num = (Math.floor(Math.random() * 100)) + 1;
    var probTotal = 0;
    var i = 0;
    var chosen = false;
    while(!chosen) {
        probTotal += allWeathers[i].prob;
        if(num <= probTotal) {
            chosen = true;
        } else {
            i++
        }//if
    } //while
    return allWeathers[i];
}

exports.getAllWeathers = function() {
    return allWeathers;
}

exports.getPlainsWeather = function() {
    var num = (Math.floor(Math.random() * 100)) + 1;
    var probTotal = 0;
    var i = 0;
    var chosen = false;
    while(!chosen) {
        probTotal += plainsWeathers[i].prob;
        if(num <= probTotal) {
            chosen = true;
        } else {
            i++
        }//if
    } //while
    console.log("Returning Plains Weather");
    return plainsWeathers[i];
}

exports.getForestWeather = function() {
    var num = (Math.floor(Math.random() * 100)) + 1;
    var probTotal = 0;
    var i = 0;
    var chosen = false;
    while(!chosen) {
        probTotal += forestWeathers[i].prob;
        if(num <= probTotal) {
            chosen = true;
        } else {
            i++
        }//if
    } //while
    console.log("Returning Forest Weather");
    return forestWeathers[i];
}

exports.getMountainWeather = function() {
    var num = (Math.floor(Math.random() * 100)) + 1;
    var probTotal = 0;
    var i = 0;
    var chosen = false;
    while(!chosen) {
        probTotal += mountainWeathers[i].prob;
        if(num <= probTotal) {
            chosen = true;
        } else {
            i++
        }//if
    } //while
    console.log("Returning Mountain Weather");
    return mountainWeathers[i];
}

exports.getDesertWeather = function() {
    var num = (Math.floor(Math.random() * 100)) + 1;
    var probTotal = 0;
    var i = 0;
    var chosen = false;
    while(!chosen) {
        probTotal += desertWeathers[i].prob;
        if(num <= probTotal) {
            chosen = true;
        } else {
            i++
        }//if
    } //while
    console.log("Returning Desert Weather");
    return desertWeathers[i];
}

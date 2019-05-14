function terrain(name, image) {
    this.name = name;
    this.image = image;
}

var allTerrains = [];
allTerrains.push(new terrain("Plains", "images/plains"));
allTerrains.push(new terrain("Mountains", "images/mountains"));
allTerrains.push(new terrain("Forest", "images/forest"));
allTerrains.push(new terrain("Desert", "images/desert"));

exports.getTerrain = function() {
    var num = Math.floor(Math.random() * (4 - 0));
    return allTerrains[num];
}

exports.getAllTerrains = function() {
    return allTerrains;
}

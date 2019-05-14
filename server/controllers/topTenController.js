var topTen = require('../models/topTen');

exports.currentTopScores = [];
exports.currentTopScores.push(topTen.addScore("Lola", 5, "03/01/2019"));
exports.currentTopScores.push(topTen.addScore("Lizzy", 50, "03/01/2019"));
exports.currentTopScores.push(topTen.addScore("Terence", 23, "03/01/2019"));

exports.getCurrentScores = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.currentTopScores);
}

function pace(name, miles, health) {
    this.name = name;
    this.miles = miles;
    this.health = health;
}//pace

var allPaces = [];
allPaces.push(new pace("Steady", 20, 0));
allPaces.push(new pace("Strenuous", 25, -3));
allPaces.push(new pace("Grueling", 30, -8));
allPaces.push(new pace("Resting", 0, 5));

exports.getAllPaces = function() {
    return allPaces;
}

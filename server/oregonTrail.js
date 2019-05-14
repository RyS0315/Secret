const express = require('express')
const app = express();
app.use(express.static('./client/public'));
const port = 1337


app.get('/', function(request, response) {
  response.sendFile('index.html', {root: './client/views'})

})

app.get('/mainmenu', function(request, response) {
  response.sendFile('mainmenu.html', {root: './client/views'})
})

app.get('/setup', function(request, response) {

  response.sendFile('setup.html', {root: './client/views'})

})

app.get('/topten', function(request, response) {
  response.sendFile('topten.html', {root: './client/views'})
})

app.get('/trail', function(request, response) {
  response.sendFile('trail.html', {root: './client/views'})
})

const gameController = require("./controllers/gameController.js");
const setupController = require("./controllers/setupController.js");


app.route('/api/game/data/')
    .get(gameController.getGameData);

app.route('/api/setup/wagonLeader/:name1')
    .post(gameController.setLeader);

app.route('/api/setup/member/:name2/:name3/:name4/:name5')
    .post(gameController.setMembers);

app.route('/api/setup/month/:month')
    .post(gameController.setMonth);

app.route('/api/setup/profession/:profession')
    .post(gameController.setProfession);

app.route('/api/setup/screen/:id')
.get(setupController.getSetupScreen);

app.route('/api/game/updateGame')
    .get(gameController.updateGameData);


app.listen(port, () => console.log('Example app listening on port 1337!'))

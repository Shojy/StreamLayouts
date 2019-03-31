var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);

var server = app.listen(9001, () => {
   console.log('server is running on port', server.address().port);
  });
var io = require('socket.io').listen(server);


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


io.on('connection', () => {
   console.log('Connected user');
});



var currentTalk = {
   speaker: 'MrShojy',
   name: 'Joshua Moon',
   title: 'Nginx and Lets Encrypt',
   img: 'https://avatars.io/twitter/mrshojy/medium',
   theme: 'general'
};

app.get('/talk', (req, res) => {
   res.send(currentTalk);
});

app.post('/talk', (req, res) => {
   currentTalk = req.body;
   io.emit('update', req.body);
   res.sendStatus(200);
});


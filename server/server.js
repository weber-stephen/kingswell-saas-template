var restify     = require('restify'),
    jf          = require('jsonfile'),
    fs          = require('fs'),
    express     = require('express')(),
    http        = require('http').Server(express),
    io          = require('socket.io')(http);

function respond(json, req, res, next, callback) {
  jf.readFile('build/data/'+json+'.json', function(err, data) { //if change detected read the sports.json 
    if(callback) {
      callback(req,data);
    } else {
      res.send(data);
      next();
    }
  });
}

var server = restify.createServer();

server.use(restify.CORS());
server.use(restify.fullResponse());

//Search
server.get('/search/:query', function (req, res, next) {
  respond('search',req,res,next);
});

//Username check
server.get('/usernameCheck/:query', function (req, res, next) {
  respond('usernameCheck',req,res,next,function(req,data) {
    var taken = false;
    for (var i = data.length - 1; i >= 0; i--) {
      if(req.params.query === data[i]) {
        taken = true;
        res.send({response:'taken'});
        next();
      }
    }
    if(!taken) {
      res.send({response:'available'});
      next();
    }
  });
});

server.get('/currentUser', function (req, res, next) {
  respond('currentUser',req,res,next);
});

server.get('/messages', function (req, res, next) {
  respond('messages',req,res,next);
});

server.get('/notifications', function (req, res, next) {
  respond('notifications',req,res,next);
});

server.get('/tableData', function (req, res, next) {
  respond('tableData',req,res,next);
});

server.get('/tasks', function (req, res, next) {
  respond('tasks',req,res,next);
});

server.get('/meetings', function (req, res, next) {
  respond('meetings',req,res,next);
});

server.get('/customers', function (req, res, next) {
  respond('customers',req,res,next);
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

console.log('Starting Socket.IO Server');

function randRange(min,max) {
  return Math.floor(Math.random() * max) + min;
}

var messages = ['Hello! How are you?','I love this system, where did you find it?','Another marketing ploy'];

function sendMessageIncoming() {
  io.sockets.emit('messageIncoming',{profile:('profile'+(randRange(1,11))+'.jpg'),msg:messages[randRange(0,2)]});
}

io.on('connection', function (socket) {

  console.log('User Connected To Socket.IO Server');

  var serverLoadUpdateInterval = setInterval(function() {
    console.log('Sending Server Load Update');
    io.sockets.emit('serverLoad',{cpu:randRange(5,100),space:randRange(5,100),bandwidth:randRange(5,100),chartValue:randRange(5,100)});
  },5000);
  
  setTimeout(function() {
    console.log('Sending Message Incoming');
    sendMessageIncoming();
  },5000);
  sendMessageIncoming();

  socket.on('disconnect', function() {
    console.log('User Disconnected From Socket.IO Server');
    clearInterval(serverLoadUpdateInterval);
  });

});

http.listen(3000, function(){
  console.log('Socket.IO listening on *:3000');
});
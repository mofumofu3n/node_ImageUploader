
/**
 * Module dependencies.
 */


var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// ルーティングを記述
app.get('/', routes.index);
app.get('/start', routes.start);
app.post('/upload', routes.upload);
app.get('/show', routes.show);



var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    console.log('connection');
    socket.on('message', function(data) {
        console.log('message');
        io.sockets.emit('message', {value : data.value});
    });

    socket.on('disconnect', function() {
        console.log('disconnect');
    });
});

var Cylon = require('cylon');
// Express requires these dependencies
var express = require('express')
, http = require('http')
, path = require('path');

var app = express();

// Configure our application
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

// Configure error handling
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Setup Routes
app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});
app.use(express.urlencoded());

// Enable Socket.io
var server = http.createServer(app).listen( app.get('port') );
var io = require('socket.io').listen( server );

function randomColor() {

  return {
    red: 0,
    green: Math.random(),
    blue: Math.random(),
    alpha: ( Math.random() * 0.25 ) + 0.05
  };

}

Cylon.robot({

  connections: {
    sphero: {
      adaptor: 'sphero',
      port: '/dev/tty.Sphero-PRR-AMP-SPP'
    }
  },

  devices: {
    sphero: {
      driver: 'sphero'
    }
  },

  work: function(my) {
    var opts = {
      flags: 0x01,
      x: 0x0000,
      y: 0x0000,
      yawTare: 0x0
    }

    my.sphero.setDataStreaming(['locator', 'accelOne', 'velocity'], opts);

    io.sockets.on('connection', function (socket) {
      every((1).second(), function() {
        my.sphero.roll(90, Math.floor(Math.random() * 360));
    });
    my.sphero.on('connect', function() {
      console.log("Setting up Collision Detection...");
      my.sphero.detectCollisions();
      my.sphero.detectLocator();
    });

    my.sphero.on('data', function(data) {
      var x = data[0];
      var y = data[1];
      var z = data[2];
      var data = {
        x: x,
        y: y,
        radius: Math.floor(Math.random() * 100),
        color: randomColor()
      };
      console.log(data)
      socket.emit( 'drawCircle', data );
    });
   });

  }
}).start();
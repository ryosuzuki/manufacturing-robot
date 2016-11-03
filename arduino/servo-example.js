var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
  var servo = new five.Servo({
    pin: 10,
    type: 'continuous'
  });

  this.repl.inject({
    servo: servo
  })

});
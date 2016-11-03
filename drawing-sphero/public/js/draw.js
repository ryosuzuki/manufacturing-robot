
tool.maxDistance = 50;

function randomColor() {
    return {
    red: 0,
    green: Math.random(),
    blue: Math.random(),
    alpha: ( Math.random() * 0.25 ) + 0.05
  };

}


function onMouseDrag(event) {

  var x = event.middlePoint.x;
  var y = event.middlePoint.y;

  var radius = event.delta.length / 2;

  var color = randomColor();

  drawCircle( x, y, radius, color );

  emitCircle( x, y, radius, color );

}


function drawCircle( x, y, radius, color ) {

  var circle = new Path.Circle( new Point( x, y ), radius );
  circle.fillColor = new RgbColor( color.red, color.green, color.blue, color.alpha );

  view.draw();
}


function emitCircle( x, y, radius, color ) {

  var sessionId = io.socket.sessionid;

  var data = {
    x: x,
    y: y,
    radius: radius,
    color: color
  };

  io.emit( 'drawCircle', data, sessionId )

  console.log( data )

}


io.on( 'drawCircle', function( data ) {

  console.log( 'drawCircle event recieved YOLO:', data );

  drawCircle( data.x, data.y, data.radius, data.color );

})
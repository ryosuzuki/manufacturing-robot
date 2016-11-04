
var Cylon = require('cylon');

/*
Cylon.robot({

  connections: {
    sphero: {
      adaptor: 'central',
      uuid: 'ed:9a:80:71:f1:fd',
      module: 'cylon-ble'
    }
  },

  devices: {
    ollie: {
      driver: 'ollie',
      module: 'cylon-sphero-ble'
    }
  },

  work: function(my) {
    every((1).second(), function() {
      my.ollie.roll(10, 0);
    })
  }

}).start();
*/

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'central', uuid: 'ed9a8071f1fd', module: 'cylon-ble'},
    // bluetooth: { adaptor: 'central', uuid: 'ffc7d9af5def', module: 'cylon-ble'}
  },
  devices: {
    ollie1: {
      driver: 'bb8',
      module: 'cylon-sphero-ble'
    },
  },
  work: function(my) {
    every((1).second(), function() {
      my.ollie1.roll(10, 0);
      my.ollie1.randomColor();
    });
  }
});

Cylon.start();


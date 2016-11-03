
var Cylon = require('cylon');

Cylon.robot({

  connections: {
    sphero: {
      adaptor: 'central',
      uuid: 'df217ecd473240119a330ccce247eb59',
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

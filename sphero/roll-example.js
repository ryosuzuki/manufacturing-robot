
var Cylon = require('cylon');

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
    every((1).second(), function() {
      my.sphero.roll(1, 0);
    })
  }

}).start();


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

    var opts = {
      flags: 0x01,
      x: 0x0000,
      y: 0x0000,
      yawTare: 0x0
    }

    my.sphero.configureLocator(opts);

    every((1).second(), function() {
      my.sphero.readLocator( function(err, data) {
        if (err) {
          console.log('err', err)
        } else {
          console.log(data);
        }
      })
    })
  }

}).start();

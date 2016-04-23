var Gpio = require('onoff').Gpio,
    led_dan = new Gpio('18', 'out'),
    ping = require('ping'),
    host = 'android-144625adee24b16c';
   
function exit() {
  led_dan.unexport();
  
  process.exit();
}

process.on('SIGINT', exit);

function lookForDevice(){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
        setTimeout(lookForDevice, 5 * 1000);
    })
}

lookForDevice();

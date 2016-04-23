var Gpio = require('onoff').Gpio,
    led_dan = new Gpio('18', 'out'),
    ping = require('ping'),
    host = 'android-8ac6f3963ac248b3';
   
function exit() {
  led_dan.unexport();
  
  process.exit();
}

process.on('SIGINT', exit);

function lookForDevice(){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
        if (isAlive) {
            led_dan.writeSync(1);
        }
        else {
            led_dan.writeSync(0);
        }
        setTimeout(lookForDevice, 5 * 1000);
    })
}

lookForDevice();

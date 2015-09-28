var program = require('commander');
var tcpPortUsed = require('tcp-port-used');

program
  .version('0.0.1')
  .option('--port [port]', 'Port to wait for', 8000)
  .parse(process.argv);

var port = +program.port

function wait () {
  tcpPortUsed.waitUntilFree(port, 500, 100000)
    .then(function() {
        console.log('Port %s is now free.', port, host);
    }, function(err) {
      if (err.message === 'timeout') {
        process.nextTick(wait)
      } else {
        console.log('Error:', err.message);
      }
    });
}

wait()
var http = require('http');
var chainExecutor = require('silence-chainexecutor');

var logger = require('silence-log').get('silence.ws.server');

function server(fcts, connector, options){
	var reqHandler = chainExecutor(fcts);
	var server = http.createServer(reqHandler);

	function start (callback) {
		logger.info("starting");
		connector.connect(function (err) {
			if (err) {
				return callback(err);
			}
			server.listen(options.port, function(){
				callback();
			});
		});
	}

	function shutdown (callback) {
		logger.info("stopping");
		connector.disconnect(function (err) {
			if (err) {
				return callback(err);
			}
			server.close(callback);
		});
	}

	return {
		start : start,
		shutdown : shutdown,
		httpServer: server
	};
}

module.exports = server;

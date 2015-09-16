var http = require('http');
var chainExecutor = require('./chainExecutor');

function server(fcts, serverDb, options){
	var reqHandler = chainExecutor(fcts);
	var server = http.createServer(reqHandler);
	
	function start (callback) {
		serverDb.connect(function (err) {
			if (err) {
				return callback(err);
			}
			server.listen(options.port, function(){
				callback();
			});
		});
	}

	function shutdown (callback) {
		serverDb.disconnect(function (err) {
			if (err) {
				return callback(err);
			}
			server.close(callback);
		});
	}

	return {
		start : start,
		shutdown : shutdown
	};
}

module.exports = server;
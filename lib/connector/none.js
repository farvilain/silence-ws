"use strict";


var logger = require('silence-log').get('silence.ws.connector.none');

function create(){
	var myDb = {
		connect : function (callback) {
			logger.info("Will pretend to connect");
			callback && callback(null);
		},
		disconnect :  function (callback) {
			logger.info("Will pretend to diconnect");
			callback && callback(null);
		}
	}
	return myDb;
}


module.exports =create;
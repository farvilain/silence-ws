"use strict";

var logger = require('silence-log').get('silence.ws.connector.mysql');

function create(options){

	var mysql = null;

	try{
		mysql = require('mysql');
	}catch(e){
		if(e.message === "Cannot find module 'mysql'"){
			throw "You should install mysql module to use this";
		}
		throw e;
	}
	
	var datas = {
		pool:null
	};

	var myDb = {
		connect : function (callback) {
			if(datas.pool){
				return callback("Already connected");
			}

			logger.info("Will connect");
			datas.pool = mysql.createPool(options);
			datas.pool.query("show tables", function(err){
				logger.info("Connected to [" + options.host+":"+options.database + "] as " + options.user);
				callback(err);
			});
		},
		disconnect :  function (callback) {
			logger.info("Will diconnect");
			datas.pool.end(callback);
		},
		query : function(query, cb){
			datas.pool.query(query, cb);
		}
	}
	return myDb;
}


module.exports =create;

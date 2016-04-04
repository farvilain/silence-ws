"use strict";


function create(dbUrl, options){
	var mongoose = null;

	try{
		mongoose = require('mongoose');
	}catch(e){
		if(e.message === "Cannot find module 'mongoose'"){
			throw "You should install mongoose module to use this";
		}
		throw e;
	}
	
	var db = mongoose.connection;
	var myDb = {
		connect : function (callback) {
			mongoose.connect(dbUrl, options, callback);
		},
		disconnect :  function (callback) {
			mongoose.disconnect(callback);
		}
	}
	return myDb;
}


module.exports =create;
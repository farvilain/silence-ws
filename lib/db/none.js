"use strict";


function create(){
	var myDb = {
		connect : function (callback) {
			callback && callback(null);
		},
		disconnect :  function (callback) {
			callback && callback(null);
		}
	}
	return myDb;
}


module.exports =create;
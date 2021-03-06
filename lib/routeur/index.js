var builder = require('./builder/builder');
var endpoint = require('./endpoint/');
var middleWare = require('./middleware/');
var chainExecutor = require('../chainexecutor');

function defaultOptionsHandler(req, res, next){
	next();
}

module.exports = function(options){
	options = options || {};
	if(options.optionsHandler === true){
		options.optionsHandler = defaultOptionsHandler;
	}
	
	var b = builder(options.optionsHandler);
	b.createEndpoints = function(){
		return endpoint(b.getRoot());
	};
	b.createMW = function(badRequest, notAllowed){
		var endpoints = this.createEndpoints();
		return middleWare(chainExecutor, endpoints, badRequest, notAllowed);
	};
	return b;
};
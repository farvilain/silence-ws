var endpointMatch = require('./endpointMatch');
var chainExecutor = require('../chainexecutor');
var middleWare = require('./middleware');

module.exports = function(endpoints, badRequest, notAllowed){
	return middleWare(endpointMatch, chainExecutor, endpoints, badRequest, notAllowed);
};
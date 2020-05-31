var endpointMatch = require('./endpointMatch');
var chainExecutor = require('silence-chainexecutor');
var middleWare = require('./middleware');

module.exports = function(endpoints, badRequest, notAllowed){
	return middleWare(endpointMatch, chainExecutor, endpoints, badRequest, notAllowed);
};
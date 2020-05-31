var endpointMatch = require('./endpointMatch');
var middleWare = require('./middleware');

module.exports = function(chainExecutor, endpoints, badRequest, notAllowed){
	return middleWare(endpointMatch, chainExecutor, endpoints, badRequest, notAllowed);
};
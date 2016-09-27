exports.chainExecutor	= require('silence-chainexecutor');
exports.server			= require('./server');
exports.connector		= require('./connector/');
exports.plugins			= require('./plugins/');
exports.error			= require('silence-error');

exports.router			= function (options) {
	var router = require('silence-router')(options);

	var oldCreateMW = router.createMW;

	router.createMW = function(badRequest, notAllowed){
		badRequest = badRequest || require('./plugins/badRequest')();
		notAllowed = notAllowed || require('./plugins/notAllowed')();
		return oldCreateMW.bind(router)(badRequest, notAllowed);
	};

	return router;
}


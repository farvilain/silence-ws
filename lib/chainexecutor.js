const logger = require('silence-log').get('silence.chainExecutor');

function create(fcts, callback){
	logger.debug("Creating with " + fcts.length + " functions");
	fcts.forEach(function(f, index){
		logger.debug("  =>" + index + ":" + f.name)
	});


	const upgraded = fcts.map( (f, i) => {
		if ( f.isSilence ) {
			logger.debug(`#${i}: ${f.name}`);
			return f;
		}
		if ( f.length === 3 ) {
			const up = (req, res) => new Promise( resolve => f(req, res, resolve) );
			Object.defineProperty(up, "name", { value: f.name });
			logger.debug(`#${i}: ${f.name} (converted in normal handler)`);
			return up;
		}
		if ( f.length === 4 ) {
			const up = (err, req, res) => new Promise( resolve => f(err, req, res, resolve) );
			Object.defineProperty(up, "name", { value: f.name });
			logger.debug(`#${i}: ${up.name} (converted in error handler)`);
			return up;
		}
		throw 'Cannot work with function '+f.name+' having function length '+f.length;
	})

	return function chainExecutor(req, res){
		return upgraded.reduce( (acc, f) => {
			return acc
			.then( (err) => {
				if( err ) {
					if ( f.length === 2 ) {
						logger.debug("Skipping error handler:" + f.name);
						return Promise.resolve(err);
					} else {
						logger.debug("Running error handler:" + f.name);
						return f(err, req, res);
					}
				} else {
					if ( f.length === 3 ) {
						logger.debug("Skipping normal handler:" + f.name);
						return Promise.resolve();
					} else {
						logger.debug("Running normal handler:" + f.name);
						return f(req, res);
					}
				}
			})
			.catch( Promise.resolve )
			;
		}, Promise.resolve())
		.then( err => !!callback && callback(err) )
		;
	};
}

module.exports = create;

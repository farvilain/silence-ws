var logger = require('silence-log').get('silence.ws.chainExecutor');

function chainExecutor(fcts){
	logger.debug("Creating with " + fcts.length + " functions");
	fcts.forEach(function(f, index){
		logger.debug("  =>" + index + ":" + f.name)
	});

	return function handler(req, res){
		var i = -1;
		function nexter(err) {
			i++;
			if (i === fcts.length) {
				if(err){
					logger.error("Ending with error:" + err);
					if(err.stack){
						logger.error(" stack:" + err.stack);
					}
				}

				logger.debug("Ending on success");
				return ;
			}
			if(i> fcts.length){
				logger.error("I'm asked to use nexter more times than there is fcts:" + i + ">" + fcts.length);
				return;
			}
			
			if (err) {
				if (fcts[i].length === 3) {
					logger.debug("Skipping normal handler ("+i+"/"+fcts.length+")"+ fcts[i].name);
					return nexter(err);
				}
				try {
					logger.debug("Running error handler ("+i+"/"+fcts.length+")"+ fcts[i].name);
					return fcts[i](err, req, res, nexter);
				} catch (e){
					return nexter(e);
				}
			}

			if( fcts[i].length === 4) {
				logger.debug("Skipping error handler ("+i+"/"+fcts.length+")"+  fcts[i].name);
				return nexter();
			}
			try{
				logger.debug("Running normal handler ("+i+"/"+fcts.length+")"+ fcts[i].name);
				return fcts[i](req, res, nexter);
			} catch(e) {
				return nexter(e);
			}
		}
		nexter();
	};
}

module.exports = chainExecutor;
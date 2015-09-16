function chainExecutor(fcts){
	return function handler(req, res){
		var i = -1;
		function nexter(err) {
			i++;
			if (i === fcts.length) {
				if(err){
					console.error("[chainExecutor]","ending with error", err);
				}
				return ;
			}
			if(i> fcts.length){
				console.warn("ChainExecutor is asked to use nexter more times than there is fcts:",i,">", fcts.length);
				return;
			}
			
			if (err) {
				if (fcts[i].length === 3) {
					return nexter(err);
				}
				try {
					return fcts[i](err, req, res, nexter);
				} catch (e){
					return nexter(e);
				}
			}

			if( fcts[i].length === 4) {
				return nexter();
			}
			try{
				return fcts[i](req, res, nexter);
			} catch(e) {
				return nexter(e);
			}
		}
		nexter();
	};
}

module.exports = chainExecutor;
function chainExecutor(fcts){
	return function handler(req, res){
		var i = -1;
		function nexter(err) {
			i++;
			if (i === fcts.length) {
				if(err){
					process.stderr.write("ChainExecutor ending with error:" + err + "\n");
					if(err.stack){
						process.stderr.write(" stack:" + err.stack + "\n");
					}
				}
				return ;
			}
			if(i> fcts.length){
				process.stderr.write("ChainExecutor is asked to use nexter more times than there is fcts:" + i + ">" + fcts.length + "\n");
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
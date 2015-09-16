//DEA@1.0.0
require("fs")
.readdirSync(__dirname)
.filter(function (file) {
	return file !== __filename
})
.forEach(function (file) {
	var name = file.replace(/.js$/, '');
	exports[name] = require('./'+name);
});

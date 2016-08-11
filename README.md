# silence-ws 

A tiny framework to build Rest Web Service for NodeJS, compatible with Connect middlewares.


## <a name='GettingStarted'>Getting started</a>

### 1 - Install the module

In your project main directory, type `npm install silence-ws --save`

### 2 - Creating the OK server


```javascript

	var silenceWS = require('silence-ws');

	//This is a connector, required parameter for the server so we use the empty implementation
	var connector = silenceWS.connector.none();
		
	//The list of Connect-like handlers, we will work on it later
	var handlers = [ 
		function (req, res, next){
			console.log("Incoming request");
			res.writeHead(200, {'Content-Type': 'text/plain'});
		  	res.end("You asked " + req.method + " on " + req.url);
		  	next();
		}
	];

	// Those are options gived to 'require('http').createServer'
	var options = {
		port : 9000
	};

	silenceWS
	.server(handlers, connector, options)
	.start(function (err) {
		if(err)
			return console.error(err);

		console.log("Server running at", options.port);
	});

```

You can now test it with `curl localhost:9000/test -X POST -i` to get the following result:
```
HTTP/1.1 200 OK
Content-Type: text/plain
Date: Fri, 19 Aug 2016 18:43:48 GMT
Connection: keep-alive
Transfer-Encoding: chunked
You asked POST on /test
```

Ok it's not wonderfull but we will improve it step by step


### 3 - Start using silence plugins to simplify your life


```javascript
	var silenceWS = require('silence-ws');

	var connector = silenceWS.connector.none();
		
	//You can read what plugins directly from source, they are very basics
	var handlers = [ 
		silenceWS.plugins.init(),

		function (req, res, next){
			console.log("Incoming request");
			res.send(200, {method : req.method, "path" : req.path});
		  	next();
		},

		silenceWS.plugins.finalSender()
	];

	var options = {
		port : 9000
	};

	silenceWS
	.server(handlers, connector, options)
	.start(function (err) {
		if(err)
			return console.error(err);

		console.log("Server running at", options.port);
	});

```

You guess it, handlers are just called sequentially.
[init plugins](lib/plugins/init.js) just helps you by
* settings `req.startDate` to `new Date()`
* adding a `res.send method` that will store the result without sending it directly
* setting the `req.path`
* initiliazing `req.params` with `{}`

[finalSender plugins](lib/plugins/finalSender.js) is responsible for:
* seetting the Allow header, based on res.allowedmethods
* stringifying the result if any and sending it with the Content-Type header
* settings `req.endDate` to `new Date()`

Let's try it with `curl localhost:9000/test -X POST -i`.

```
HTTP/1.1 200 OK
Allow: 
Content-Type: application/json
Date: Fri, 19 Aug 2016 18:45:54 GMT
Connection: keep-alive
Content-Length: 32

{"method":"POST","path":"/test"}
```

Seems to look better right?

### 4 - Handling errors

```javascript
	var silenceWS = require('silence-ws');

	var connector = silenceWS.connector.none();
		
	var handlers = [ 
		silenceWS.plugins.init(),

		function (req, res, next){
		  	next({statusCode:500, restCode:"InternalServerError"});
		  	//It's always working with next("Doesn't work") or throw new Error("WTF")
		},
		silenceWS.plugins.errorToJson(),
		silenceWS.plugins.finalSender()
	];

	var options = {
		port : 9000
	};

	silenceWS
	.server(handlers, connector, options)
	.start(function (err) {
		if(err)
			return console.error(err);

		console.log("Server running at", options.port);
	});

```

[errorToJson plugins](lib/plugins/errorToJson.js) is your first error handler, it will convert errors to a valid Rest response.
As usual let's try it with `curl localhost:9000/test -X POST -i`. Seems to look better right?


### 5 - Let's have a real router

```javascript

	var silenceWS = require('silence-ws');

	var connector = silenceWS.connector.none();
		
	//We use in fact silence-router, that's include in silence-ws... but you can install the version you want and require it directly
	function createRouter(){
		return silenceWS
		.router()
		.path("help")
			.get("displayHelp", function (req, res, next){
				res.send(200, {method : req.method, "path" : req.path});
				next();
			})
		.parent()
		.createMW(silenceWS.plugins.badRequest(), silenceWS.plugins.notAllowed())
		;
	}

	var handlers = [ 
		silenceWS.plugins.init(),
		createRouter(),
		silenceWS.plugins.errorToJson(),
		silenceWS.plugins.finalSender()
	];

	var options = {
		port : 9000
	};

	silenceWS
	.server(handlers, connector, options)
	.start(function (err) {
		if(err)
			return console.error(err);

		console.log("Server running at", options.port);
	});
```

Want to learn more about this router? Just check [silence-router](https://github.com/farvilain/silence-router)
Just remember that silence-router NEED te `req.path` value, but the 'init' plugin provides it.

### 6 What's next?

Just start reading the code, more precisely plugins and connectors.





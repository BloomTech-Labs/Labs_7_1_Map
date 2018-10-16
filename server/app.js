const server = require('./server');

//const port = config.port;
const port = 8000;
server.listen((err) => {
	if (err) {
		console.log(`API error: ${err}`);
		return;
	}
	console.log(`API is running on port ${port}`);
});

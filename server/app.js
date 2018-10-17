const mongoose = require('mongoose');

// Connect to the dataase
(async function connect_db() {
	try {
		// connection url, with an object of options as a second parameter
		await mongoose.connect('mongodb://127.0.0.1:27017/test', {
			autoReconnect: true,
			reconnectTries: 1000000,
			reconnectInterval: 3000,
			useNewUrlParser: true,
			useCreateIndex: true,
		});
		console.log('Database connection successful');
	} catch (err) {
		// catches any databse errors encountered
		console.log(`There was a database connection error: ${err}`);
	}
})(); // self executing function

const server = require('./server');

//const port = config.port;
const port = 8000;
server.listen(port, (err) => {
	if (err) {
		console.log(`API error: ${err}`);
		return;
	}
	console.log(`API is running on port ${port}`);
});

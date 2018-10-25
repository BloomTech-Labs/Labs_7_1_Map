const mongoose = require('mongoose');
const server = require('./server');

// PORT environment variable is needed for deployment
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/scratchnmap';

// Connect to the database
try {
  // connection url, with an object of options as a second parameter
  mongoose.connect(
    DB_URL,
    {
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  );
  console.log('\n\u2705 Database connection successful\n');
} catch (err) {
  // catches any databse errors encountered
  console.log(`\n\u274C There was a database connection error: ${err}\n`);
}

// Start up the server.
server.listen(PORT, err => {
  if (err) {
    console.log(`\u274C API error: ${err}\n`);
    return;
  }

  console.log(`\u2705 API running on port ${PORT}\n`);
});

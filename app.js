const mongoose = require('mongoose');
const server = require('./server');

// PORT environment variable is needed for deployment
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/scratchnmap';

const DEV = Boolean(process.env.DEV);
// Connect to the database
(async function connect_db() {
  try {
    // connection url, with an object of options as a second parameter
    await mongoose.connect(
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
    if (DEV) {
      // helpe to identify the source of the database
      const DB_SOURCE = DB_URL.indexOf('@') === -1 ? 'LOCAL DB' : 'REMOTE DB'; // if - 1 then local
      console.log(`DEVELOPMENT MODE: DB is ${DB_SOURCE}`);
    }
  } catch (err) {
    // catches any databse errors encountered
    if (DEV) {
      console.log(`\n\u274C There was a database connection error: ${err}\n`);
    } else {
      console.log(`\n\u274C There was a database connection error\n`);
  }

// Start up the server.
server.listen(PORT, err => {
  if (err && DEV) {
    console.log(`\u274C API error: ${err}\n`);

    return;
  } else if (err) {
    console.log(`\u274C API error\n`);
  }

  console.log(`\u2705 API running on port ${PORT}\n`);
});

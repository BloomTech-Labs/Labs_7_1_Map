const mongoose = require('mongoose');
const server = require('./server');

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/scratchnmap';
const DEV = process.env.DEV || true;

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
    console.log('Database connection successful');
  } catch (err) {
    // catches any databse errors encountered
    if (DEV) {
      console.log(`There was a database connection error: ${err}`);
    }
  }
})(); // self executing function

//const port = config.port;
const PORT = process.env.PORT || 8000;
server.listen(PORT, err => {
  if (err) {
    console.log(`API error: ${err}`);
    return;
  }
  console.log(`API is running on port ${PORT}`);
});

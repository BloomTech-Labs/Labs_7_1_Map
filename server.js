const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// bring in the routes
const routes = require('./api/routes');

// create a server
const server = express();

// use json
server.use(express.json());

server.use(morgan('dev'));
server.use(helmet());

// cross origin request sharing permissions
const corsOptions = {
  origin: '*',
  credentials: true
};

server.use(cors(corsOptions));

// Serve up static client files (in `/client/build` folder) at root endpoint.
//    Static files are created by the `heroku-postbuild` script in package.json
//    during deployment
server.use(express.static(path.join(__dirname, 'client/build')));

// pass the server to the routes
routes(server);

// export the server to the app
module.exports = server;

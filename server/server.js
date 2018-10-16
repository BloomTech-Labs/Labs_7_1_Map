const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// create a server
const server = express();

// use json
server.use(express.json());

server.use(morgan('dev'));
server.use(helmet());

// cross origin request sharing permissions
const corsOptions = {
	origin: '*',
	credentials: true,
};

server.use(cors(corsOptions));

module.exports = server;

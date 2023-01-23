const express = require('express');
const routes = require('./routes');
var cors = require('cors')
// const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure the routes and API endpoints
app.use(routes);

// start listening for incoming HTTP traffic
app.listen(PORT, () => console.log('Now listening'));
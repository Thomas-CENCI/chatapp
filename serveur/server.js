//Use Express middleware to manage incoming requests and 
//dispatch them to corresponding behaviours
const express = require('express');

//Access the path 
const path = require('path');

let bodyParser = require('body-parser');

const morgan = require("morgan");

const {loggers, transports, format} = require("winston");

const chalk = require('chalk');

//used to reduce response body
let compression = require('compression');

//Accessing MongoDB
const mongoose = require('mongoose');

//Create an application 
const app = express();


//Connecting to MongoDB (async/await approach)
const connectDb = async () => {
    await mongoose.connect('mongodb+srv://root:root@cluster0.zzjke.mongodb.net/chat?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology : true}).then(
        () => {
            console.log(chalk.green(`Connected to database`))
            infoLogger.info("Connected to database");
        },
        error => {
            console.error(chalk.red(`Connection error: ${error.stack}`))
            process.exit(1)
        }
    )
  }
  
connectDb().catch(error => console.error(error))

const User = require('./models/userModel');

const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

//compress response body for better performance
app.use(compression());

//disable headers indicating pages are coming from an Express server
app.disable('x-powered-by');

//used to fetch the data from forms on HTTP POST, and PUT
app.use(bodyParser.urlencoded({

    extended : true
  
  }));
  
app.use(bodyParser.json());
  
//Use the morgan logging 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//Define the loggers for Winston
loggers.add('infoLogger', {
    level: 'info',
    transports: [new transports.File({ filename: path.join(__dirname, 'logs/info.log')})],
    format: format.printf((info) => {
      let message = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`
      return message
    })
});

loggers.add('errorLogger', {
    level: 'error',
    transports: [new transports.File({ filename: path.join(__dirname, 'logs/error.log')})],
    format: format.printf((info) => {
      let message = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`
      return message
    })
});

const infoLogger = loggers.get('infoLogger');

  
//Accessing the routes for the user
const userRoutes = require('./routes/userRoutes');
require('./models/userModel');

//Acces the routes 
app.use('/api/v1/', userRoutes);


//When there is no route that caught the incoming request
//use the 404 middleware

//Listen on the port 3000
app.listen(process.env.PORT || 5000);

//Print out where the server is
console.log(chalk.green("Server is running on port: 5000"));
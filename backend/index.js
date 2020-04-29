var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var mainRouter = require('./routes'); 
var morgan = require('morgan');
var helmet = require('helmet');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

var app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
app.use(compression());
app.use(methodOverride());
app.use(cookieParser());

app.use(mainRouter);


const PORT = 3000;
const HOST = "127.0.0.1";

var server = app.listen(PORT,HOST);
console.log(`Express server listening on http://${HOST}:${PORT}`);
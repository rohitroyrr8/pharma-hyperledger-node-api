import * as express from 'express'
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as http from 'http';
import expressJWT from 'express-jwt';
import * as jwt from 'jsonwebtoken';
import util = require('util');
import log4js = require('log4js');
import controllers from './src/controllers';
const logger = log4js.getLogger('Pharma SupplyChain')
const bearerToken = require('express-bearer-token');
const app = express();

const port = process.env.PORT || 3000 ;  
const JWTSecret = process.env.JWT_SECRET;

app.options('*', cors());
app.use(cors());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  extended : false
}));

//app.use('secret', JWTSecret);

controllers(app);

const server = http.createServer(app);
server.listen(port);
server.timeout = 190000;


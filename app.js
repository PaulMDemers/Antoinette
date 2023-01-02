const fs = require('fs');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', require('./routes/posts'));

switch(process.env.TOKEN_METHOD) {
    case "JWKS":
        {
            var SECURE = require('express-jwt-jwks')({
                jwks : process.env.JWKS_ENDPOINT
            });
            app.use(SECURE);
            app.use('/admin', require('./routes/admin'));
        }
        break;

    case "JWT":
        {
            var pubKey = fs.readFileSync(process.env.JWT_PUBLIC);
            var { expressjwt: jwt } = require("express-jwt");
            app.use(jwt({secret: pubKey, algorithms: ['RS256']}));
            app.use('/admin', require('./routes/admin'));
        }
        break;

    default:
        console.log("NO AUTH METHOD DEFINED, ADMIN ENDPOINTS DISABLED");
        break;
}

module.exports = app;

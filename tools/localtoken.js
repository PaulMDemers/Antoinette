const fs = require('fs');
var jwt = require('jsonwebtoken');
var privateKey = fs.readFileSync('private.pem');
var token = jwt.sign({ foo: 'bar' }, {key: privateKey, passphrase: 'ENTERPASSPHRASE'}, { algorithm: 'RS256' });

console.log(token)
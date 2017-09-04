var path = require('path');
var fs = require('fs');

var configName = 'config.production.json';
var configFile = JSON.parse(fs.readFileSync(configName, 'utf8'));

process.env.NODE_ENV = 'production';

configFile.server.port = process.env.PORT;

// remove mysql://
connectionString = process.env.CLEARDB_DATABASE_URL;
connectionString = connectionString.substring(8, connectionString.length)

// Get user and password
var userAndPassw = connectionString.split('@')[0];
var user = userAndPassw.split(':')[0];
var password = userAndPassw.split(':')[1];

// Host and DB
var hostAndDb = connectionString.split('@')[1];
hostAndDb = hostAndDb.split('?')[0];

var host = hostAndDb.split('/')[0];
var db = hostAndDb.split('/')[1];

configFile.database.connection = {
    "host": host,
    "user": user,
    "password": password,
    "database": db
}

configFile.mail.options.auth.user = process.env.MAILGUN_SMTP_LOGIN;
configFile.mail.options.auth.pass = process.env.MAILGUN_SMTP_PASSWORD;

console.log(configFile);

// Write modified config JSON file
fs.writeFileSync(configName, JSON.stringify(configFile));

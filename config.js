var path = require('path');
var fs = require('fs');

var configName = 'config.production.json';
var configFile = JSON.parse(fs.readFileSync(configName, 'utf8'));

process.env.NODE_ENV = 'production';

configFile.server.port = process.env.PORT;
configFile.database.connection = process.env.CLEARDB_DATABASE_URL;
configFile.mail.options.auth.user = process.env.MAILGUN_SMTP_LOGIN;
configFile.mail.options.auth.pass = process.env.MAILGUN_SMTP_PASSWORD;

// Write modified config JSON file
fs.writeFileSync(configName, JSON.stringify(configFile));

const nconf = require('nconf');

nconf
    .argv()
    .env()
    .file({ file: __dirname + '\\conf.json' });

module.exports = nconf;

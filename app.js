"use strict";

const App = require('./myApp/app');
const logger = require('./myApp/middleware/logger');
const config = require('./config');
const statics = require('./myApp/middleware/static');
const router = require('./myApp/middleware/router');
const routes = require('./myApp/routes').setup();
const bodyParser = require('./myApp/middleware/bodyParser');
var app = new App;


config.set('nodePath', process.cwd());

app.use(bodyParser);
app.use(logger);
app.use(statics);
app.use(router);

if (module.parent) {
    module.exports = app;
} else {
    app.listen(config.get('port'));
}
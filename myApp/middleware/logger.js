function logger(req, res, next) {
    console.log(req.method + ' ' + req.url + ' - ' + req.connection.remoteAddress);
    next();
}

module.exports = logger;
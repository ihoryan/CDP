function logger(err, req, res, next) {
    console.log(req.method + ' ' + req.url + ' - ' + req.connection.remoteAddress);
    next(err);
}

module.exports = logger;
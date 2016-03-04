"use strict";
function bodyParser(req, res, next) {
    var data = '';

    if (req.method === "GET") {
        next();
        return;
    }

    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', () => {
        req.body = data ? JSON.parse(data) : "";
        next();
    })
}

module.exports = bodyParser;
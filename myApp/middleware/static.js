"use strict";

const fs = require("fs");
const path = require("path");
const config = require("../../config");

var contentTypes = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
};


function statics(req, res, next) {
    var uri = path.parse(req.url),
        filename = path.join(config.get('nodePath'), req.url);

    if (req.method === 'GET' && uri.dir.startsWith(config.get('static:path')) && uri.ext) {

        fs.exists(filename, function(exists) {

            if (!exists) {
                console.log('not found 404');
                return;
            }

            fs.readFile(config.get('nodePath') + req.url, (err, data)  => {

                if (err) {
                    console.log(err);
                    next();
                    return;
                }

                res.writeHead(200, {
                    "Content-Length": data.length,
                    "Content-Type": contentTypes[uri.ext]
                });
                res.write(data, "utf8");
                res.end();
                next();
            });
        });
    } else {
        next();
    }
}

module.exports = statics;

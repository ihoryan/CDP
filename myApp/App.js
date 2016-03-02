"use strict";

const http = require('http');

class App {
    constructor() {
        this.middlewares = [];
    }

    use(fn) {
        this.middlewares.push(fn);
    }

    handle(req, res) {
        this.runNextMiddleware.call(this, req, res, 0);
    }

    runNextMiddleware(req, res, idx) {
        if (idx >= this.middlewares.length) {
            return res.end();
        }

        let mw = this.middlewares[idx];
        mw(err, req, res, this.runNextMiddleware.bind(this, req, res, idx + 1));
    }

    listen(port) {
        let server = http.createServer();

        server.listen(port);
        server.on('request', (req, res) => {
            this.handle(req, res);
        });
    };
}

module.exports = App;

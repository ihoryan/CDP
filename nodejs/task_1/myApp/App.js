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
        if (idx === this.middlewares.length) {
            return res.end();
        }

        let mw = this.middlewares[idx];
        let fn = typeof mw === 'function' ? mw : mw.handle.bind(mw);

        fn(req, res, this.runNextMiddleware.bind(this, req, res, idx + 1));
    }

    listen(port) {
        let server = http.createServer();

        server.listen(port);
        console.log('Server is running on ' + port + ' port');

        server.on('request', (req, res) => {
            this.handle(req, res);
        });
    };
}

module.exports = App;

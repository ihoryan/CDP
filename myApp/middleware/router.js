"use strict";

class Router {
    constructor() {
        this.rules = [];
    }

    get(url, fn) {
        this.rules.push({
            method: 'get',
            url: url,
            fn: fn
        });
    }

    post(url, fn) {
        this.rules.push({
            method: 'post',
            url: url,
            fn: fn
        });
    }

    delete(url, fn) {
        this.rules.push({
            method: 'delete',
            url: url,
            fn: fn
        });
    }

    handle(req, res, next) {
        this.rules.forEach(function (e) {
            if (req.method.toLowerCase() === e.method.toLowerCase() &&
                req.url === e.url) {
                e.fn(req, res, next);
            }
        });
    }

}

module.exports = new Router;



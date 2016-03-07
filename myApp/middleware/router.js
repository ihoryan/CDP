"use strict";

const pathToRegexp = require('path-to-regexp');

class Router {
    constructor() {
        this.rules = [];
    }

    get(url, fn) {
        this.rules.push({
            method: 'get',
            url: url,
            regexp: pathToRegexp(url),
            fn: fn
        });
    }

    post(url, fn) {
        this.rules.push({
            method: 'post',
            url: url,
            regexp: pathToRegexp(url),
            fn: fn
        });
    }

    put(url, fn) {
        this.rules.push({
            method: 'put',
            url: url,
            regexp: pathToRegexp(url),
            fn: fn
        });
    }

    delete(url, fn) {
        this.rules.push({
            method: 'delete',
            url: url,
            regexp: pathToRegexp(url),
            fn: fn
        });
    }

    handle(req, res, next) {
        this.rules.forEach(function (e) {

            if (req.method.toLowerCase() === e.method.toLowerCase() &&
                e.regexp.test(req.url)) {

                req.pathKeys = {};
                e.regexp.keys.forEach((el, i) => {
                    req.pathKeys[el.name] = e.regexp.exec(req.url)[i+1];
                });

                e.fn(req, res, next);
            }
        });
    }

}

module.exports = new Router;



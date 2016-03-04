"use strict";

const render = require('./middleware/view-engine')("html");
const db = require('../fake-db');
module.exports = {

    indexHtml(req, res, next) {
        render('index')
            .then(
                page => {
                    res.setHeader("Content-Type", "text/html");
                    res.write(page);
                    res.end();
                    next();
                },
                err => {
                    console.log(err);
                    next();
                }
            );
    },

    favicon(req, res, next) {
        res.statusCode = 404;
        res.end();
        next();
    },

    usersCollection(req, res, next) {
        db.getCollection((err, data) => {
            res.setHeader("Content-type", "application/json");
            res.write(JSON.stringify(data));
            res.end();
            next();
        });
    },

    addUser(req, res, next) {
        let data = req.body;
        if (data) {
            db.create(data, (err, model) => {
                res.setHeader("Content-type", "application/json");
                res.write(JSON.stringify(model));
                res.end();
                next();
            });
        } else {
            next();
        }
    },

    removeUser(req, res, next) {
        console.log(req);
    }
};
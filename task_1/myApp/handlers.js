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
        next();
    },

    usersCollection(req, res, next) {
        db.getCollection((err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            res.setHeader("Content-type", "application/json");
            res.write(JSON.stringify(data));
            next();
        });
    },

    getUser(req, res, next) {
        db.getById(req.pathKeys.id, (err, model) => {

            if (err) {
                console.log(err);
                return;
            }

            res.setHeader("Content-type", "application/json");
            res.write(JSON.stringify(model));
            next();
        });
    },

    addUser(req, res, next) {
        let data = req.body;

        if (data) {
            db.create(data, (err, model) => {
                res.setHeader("Content-type", "application/json");
                res.write(JSON.stringify(model));
                next();
            });
        } else {
            next();
        }
    },

    updateUser(req, res, next) {

        if (req.body) {
            db.update(req.body, function(err, model){
                if (err) {
                    console.log(err);
                    return;
                }

                res.write(JSON.stringify(model));
                next()
            })

        }

    },

    removeUser(req, res, next) {
        db.remove(req.pathKeys.id, function(err){
            if (err) {
                console.log(err);
                return;
            }
            res.statusCode = 200;
            next();
        });

    }
};
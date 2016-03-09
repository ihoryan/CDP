const config = require("../../config");
const fs = require('fs');

module.exports = function (ext) {

    function render(filename) {
        filename = config.get('nodePath').concat(config.get('views'), '/', filename, '.', ext);
        return new Promise((resolve, reject) => {
            fs.readFile(filename, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    return render;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = void 0;
const fs = require("fs");
const chalk = require("chalk");
class Cat {
    constructor(path) {
        this.path = path;
    }
    logic() {
        fs.readFile(this.path, 'utf8', function (err, data) {
            if (err) {
                console.log(chalk.yellow('No se pudo mostrar el contenido del archivo: ', this.path));
                return console.error(err);
            }
            else {
                console.log(chalk.blue(data));
            }
        });
    }
}
exports.Cat = Cat;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mkdir = void 0;
const fs = require("fs");
const chalk = require("chalk");
class Mkdir {
    constructor(path) {
        this.path = path;
    }
    logic() {
        fs.mkdir(this.path, (err) => {
            if (err) {
                console.log(chalk.yellow('No se pudo crear el directorio: ', this.path));
                return console.error(err);
            }
            else {
                console.log(chalk.green('Se creó el directorio:', chalk.yellow(this.path), 'correctamente'));
            }
        });
    }
}
exports.Mkdir = Mkdir;
;

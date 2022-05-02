"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ls = void 0;
const fs = require("fs");
const chalk = require("chalk");
class Ls {
    constructor(path) {
        this.path = path;
    }
    logic() {
        fs.readdir(this.path, (err, files) => {
            if (err) {
                console.log(chalk.yellow('No se pudo listar el directorio: ', this.path));
                return console.error(err);
            }
            else {
                files.forEach(file => {
                    console.log(" -", file);
                });
            }
        });
    }
}
exports.Ls = Ls;
;

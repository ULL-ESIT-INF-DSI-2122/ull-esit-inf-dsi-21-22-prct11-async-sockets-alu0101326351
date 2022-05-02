"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Whatis = void 0;
const fs = require("fs");
const chalk = require("chalk");
class Whatis {
    constructor(path) {
        this.path = path;
    }
    logic() {
        fs.lstat(`${this.path}`, (err, stats) => {
            if (err) {
                return console.log(err);
            }
            if (stats.isDirectory()) {
                console.log(chalk.green(chalk.yellow(this.path), "is a directory"));
            }
            else if (stats.isFile()) {
                console.log(chalk.green(chalk.yellow(this.path), "is a file"));
            }
        });
    }
}
exports.Whatis = Whatis;
;

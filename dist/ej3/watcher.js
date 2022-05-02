"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watch = void 0;
const chalk = require("chalk");
const fs = require("fs");
const process_1 = require("process");
class Watch {
    constructor(path) {
        this.path = path;
    }
    watchDir() {
        if (!fs.existsSync(this.path)) {
            console.log(chalk.red("No se ha encontrado la ruta indicada"));
            (0, process_1.exit)(0);
        }
        fs.watch(`${this.path}`, (eventType, file) => {
            if (eventType === 'change') {
                console.log(`El fichero ${this.path} ha sido modificado`);
                const dataFile = fs.readFileSync(this.path + '/' + file, 'utf-8');
                console.log(chalk.yellow(dataFile.toString()));
            }
            else if (eventType === 'rename') {
                if (fs.existsSync(this.path + '/' + file)) {
                    console.log(chalk.grey('Se ha creado el fichero', file));
                }
                else {
                    console.log(chalk.grey('Se ha borrado el fichero', file));
                }
            }
        });
    }
}
exports.Watch = Watch;
let a = new Watch(process.argv[2]);
a.watchDir();

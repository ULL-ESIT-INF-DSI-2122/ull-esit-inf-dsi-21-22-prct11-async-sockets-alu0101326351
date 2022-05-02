import chalk = require('chalk');
import * as fs from 'fs'
import { exit } from 'process';

export class Watch {
    constructor(
        private path:string
    ) {}

    public watchDir() {
        if (!fs.existsSync(this.path)) {
            console.log(chalk.red("No se ha encontrado la ruta indicada"));
            exit(0);
        }

        fs.watch(`${this.path}`, (eventType, file) => {
            if (eventType === 'change') {
                console.log(`El fichero ${this.path} ha sido modificado`);
                const dataFile = fs.readFileSync(this.path +'/' + file, 'utf-8');
                console.log(chalk.yellow(dataFile.toString()));
            } else if (eventType === 'rename') {
                if (fs.existsSync(this.path +'/' + file)) {
                    console.log(chalk.grey('Se ha creado el fichero', file));
                } else {
                    console.log(chalk.grey('Se ha borrado el fichero', file));
                }             
            }
        });
    }
}


let a: Watch = new Watch(process.argv[2]);
a.watchDir()
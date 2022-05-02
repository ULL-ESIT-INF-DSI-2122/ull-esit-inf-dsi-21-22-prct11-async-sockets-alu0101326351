import * as fs from 'fs';
import * as chalk from 'chalk';

export class Ls {
    constructor(
        private path: string
    ) {}

    public logic() {
        fs.readdir(this.path, (err, files) => {
            if (err) {
                console.log(chalk.yellow('No se pudo listar el directorio: ', this.path))
                return console.error(err);
            } else {
                files.forEach(file => {
                    console.log(" -", file);
                });
            }
        });
    }
};
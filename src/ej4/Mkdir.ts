import * as fs from 'fs';
import * as chalk from 'chalk';

export class Mkdir {
    constructor(
        private path: string
    ) {}

    public logic() {
        fs.mkdir(this.path, (err) => {
            if (err) {
                console.log(chalk.yellow('No se pudo crear el directorio: ', this.path))
                return console.error(err);
            } else {
                console.log(chalk.green('Se creó el directorio:', chalk.yellow(this.path), 'correctamente'))
            }
        });

    }
};
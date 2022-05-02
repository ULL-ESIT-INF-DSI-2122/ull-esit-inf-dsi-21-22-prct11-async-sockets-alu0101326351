import * as fs from 'fs';
import * as chalk from 'chalk';

export class Cat {
    constructor(
        private path: string
    ) {}

    public logic() {
        fs.readFile(this.path, 'utf8', function(err, data) {
            if (err) {
                console.log(chalk.yellow('No se pudo mostrar el contenido del archivo: ', this.path))
                return console.error(err);
            } else {
                console.log(chalk.blue(data))
            }
        });
    }
};
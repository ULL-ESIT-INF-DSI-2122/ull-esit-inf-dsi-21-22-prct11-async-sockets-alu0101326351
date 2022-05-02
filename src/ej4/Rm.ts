import * as fs from 'fs';
import * as chalk from 'chalk';

export class Rm {
    constructor(
        private path: string
    ) {}

    public logic() {
        fs.lstat(`${this.path}`, (err, stats) => {
            if (err) {
                return console.log(err);
            }

            if (stats.isDirectory()) {
                fs.rmdir(`${this.path}`, (err) => {
                    if (err) {
                        console.log(chalk.yellow('No se pudo borrar el directorio: ', this.path))
                        return console.error(err);
                    } else {
                        console.log(chalk.blue("El directorio:", this.path, "ha sido eliminado correctamente"));
                    }
                });

            } else if (stats.isFile()) {
                fs.unlink(`${this.path}`, (err) => {
                    if (err) {
                        console.log(chalk.yellow('No se pudo borrar el fichero: ', this.path))
                        return console.error(err);
                    } else {
                        console.log(chalk.blue("El fichero:", this.path, "ha sido eliminado correctamente"));
                    }
                });
            }
        });
    }
};
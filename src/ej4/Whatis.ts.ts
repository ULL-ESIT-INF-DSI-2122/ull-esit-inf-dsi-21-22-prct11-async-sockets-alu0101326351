import * as fs from 'fs';
import * as chalk from 'chalk';

export class Whatis {
    constructor(
        private path: string
    ) {}

    public logic() {
        fs.lstat(`${this.path}`, (err, stats) => {
            if (err) {
                return console.log(err);
            }

            if (stats.isDirectory()) {
                console.log(chalk.green(chalk.yellow(this.path), "is a directory"));
            } else if (stats.isFile()) {
                console.log(chalk.green(chalk.yellow(this.path), "is a file"));
            }
        });
    }
};
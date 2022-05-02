"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountWords = void 0;
const child_process_1 = require("child_process");
class CountWords {
    constructor(path) {
        this.path = path;
    }
    count() {
        const expresion = /Hola/g;
        const cat = (0, child_process_1.spawn)('cat', [this.path]);
        const grep = (0, child_process_1.spawn)('grep', ['Hola']);
        cat.stdout.pipe(grep.stdin);
        grep.stdout.on('data', (data) => {
            let matches = data.toString().match(expresion);
            console.log("La palabra 'Hola', se repite ", matches.length, " veces en el siguiente archivo: ", this.path);
        });
    }
}
exports.CountWords = CountWords;
;

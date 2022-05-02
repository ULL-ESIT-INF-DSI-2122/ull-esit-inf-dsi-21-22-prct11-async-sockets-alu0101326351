"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountWords = void 0;
const child_process_1 = require("child_process");
/**
 * Clase que cuenta el número de veces que se repite la palabra Hola en un archivo el cual se pasa por parámetro al constructor
 */
class CountWords {
    /**
     * Constructor que recibe la ruta al fichero
     * @param path string
     */
    constructor(path) {
        this.path = path;
    }
    /**
     * Cuenta las veces que se repite la palabra Hola en el fichero indicado al constructor, haciendo uso de los comandos
     * cat y grep de Unix y expresiones regulares de TypeScript
     */
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
let counter = new CountWords(process.argv[2]);
counter.count();

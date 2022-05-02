import { spawn } from "child_process";

/**
 * Clase que cuenta el número de veces que se repite la palabra Hola en un archivo el cual se pasa por parámetro al constructor
 */
export class CountWords {
    /**
     * Constructor que recibe la ruta al fichero
     * @param path string
     */
    constructor(
        private path: string
    ) {}

    /**
     * Cuenta las veces que se repite la palabra Hola en el fichero indicado al constructor, haciendo uso de los comandos
     * cat y grep de Unix y expresiones regulares de TypeScript
     */
    public count() {
        const expresion: RegExp = /Hola/g;
        const cat = spawn('cat', [this.path]);
        const grep = spawn('grep', ['Hola']);

        cat.stdout.pipe(grep.stdin);

        grep.stdout.on('data', (data) => {
            let matches: string[] = data.toString().match(expresion);
            console.log("La palabra 'Hola', se repite ", matches.length, " veces en el siguiente archivo: ", this.path);
        });
    }
};

let counter: CountWords = new CountWords(process.argv[2])
counter.count();

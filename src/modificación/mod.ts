import {existsSync, watchFile} from 'fs';
import {spawn} from 'child_process';
import { exit } from 'process';

/**
 * Clase Watcher
 */
export class Watch {

    /**
     * Constructor recibe el fichero y el campo
     * @param fileName 
     * @param cutField 
     */
    constructor(
        private fileName: string,
        private cutField: string
    ) {}

    /**
     * Comprueba que los datos son validos
     * @returns 
     */
    private check(): boolean {
        let correctFormat: boolean = true
    
        if (!existsSync(this.fileName)) {
            console.log('El fichero no existe');
            correctFormat = false;
        }

        if (parseInt(this.cutField) <= 0 || parseInt(this.cutField) > 3 ) {
            console.log('El número de campo no es válido');
            correctFormat = false; 
        }

        return correctFormat;
    }

    /**
     * Se mantiene a la escucha del fichero
     */
    public run() {
        
       if (this.check()) {
            watchFile(this.fileName, (curr, prev) => {
                let splitCSV: string[] = []
                const cut = spawn('cut', ['-d', ',', '-f', this.cutField, this.fileName]);

                if (!existsSync(this.fileName)) {
                    console.log('El fichero se ha eliminado');
                    exit(1);
                }

                cut.stdout.on('data', (data) => {
                    splitCSV = data;
                    console.log(`${splitCSV}`);
                });
            });
       }
    }
}


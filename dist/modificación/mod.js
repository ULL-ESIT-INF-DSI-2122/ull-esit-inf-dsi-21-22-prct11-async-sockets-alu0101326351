"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watch = void 0;
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const process_1 = require("process");
/**
 * Clase Watcher
 */
class Watch {
    /**
     * Constructor recibe el fichero y el campo
     * @param fileName
     * @param cutField
     */
    constructor(fileName, cutField) {
        this.fileName = fileName;
        this.cutField = cutField;
    }
    /**
     * Comprueba que los datos son validos
     * @returns
     */
    check() {
        let correctFormat = true;
        if (!(0, fs_1.existsSync)(this.fileName)) {
            console.log('El fichero no existe');
            correctFormat = false;
        }
        if (parseInt(this.cutField) <= 0 || parseInt(this.cutField) > 3) {
            console.log('El número de campo no es válido');
            correctFormat = false;
        }
        return correctFormat;
    }
    /**
     * Se mantiene a la escucha del fichero
     */
    run() {
        if (this.check()) {
            (0, fs_1.watchFile)(this.fileName, (curr, prev) => {
                let splitCSV = [];
                const cut = (0, child_process_1.spawn)('cut', ['-d', ',', '-f', this.cutField, this.fileName]);
                if (!(0, fs_1.existsSync)(this.fileName)) {
                    console.log('El fichero se ha eliminado');
                    (0, process_1.exit)(1);
                }
                cut.stdout.on('data', (data) => {
                    splitCSV = data;
                    console.log(`${splitCSV}`);
                });
            });
        }
    }
}
exports.Watch = Watch;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*import { Watch } from "./mod";

if (process.argv.length !== 4) {
    console.log('No se ha introducido el fichero y el campo');
} else {
    const fileName: string = process.argv[2];
    const cutField: string = process.argv[3];

    let watcher: Watch = new Watch(fileName, cutField);
    watcher.run();
}*/
const fs_1 = require("fs");
(0, fs_1.writeFile)('a.csv', 'Hello World!', (myVar) => {
    console.log(myVar);
});

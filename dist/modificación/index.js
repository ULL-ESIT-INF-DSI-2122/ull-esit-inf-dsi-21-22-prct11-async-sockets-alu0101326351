"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mod_1 = require("../modificaci\u00F3n/mod");
if (process.argv.length !== 4) {
    console.log('No se ha introducido el fichero y el campo');
}
else {
    const fileName = process.argv[2];
    const cutField = process.argv[3];
    let watcher = new mod_1.Watch(fileName, cutField);
    watcher.run();
}

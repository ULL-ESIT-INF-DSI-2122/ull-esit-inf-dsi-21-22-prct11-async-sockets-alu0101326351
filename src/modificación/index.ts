import { Watch } from "../modificación/mod";

if (process.argv.length !== 4) {
    console.log('No se ha introducido el fichero y el campo');
} else {
    const fileName: string = process.argv[2];
    const cutField: string = process.argv[3];

    let watcher: Watch = new Watch(fileName, cutField);
    watcher.run();
}
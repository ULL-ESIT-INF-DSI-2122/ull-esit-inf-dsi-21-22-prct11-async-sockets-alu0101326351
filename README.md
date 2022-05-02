# Práctica 10 - Sistema de ficheros y creación de procesos en Node.js

## Ejercicio 2

Se ha creado una clase para gestionar el conteo de veces que se repite la palabra 'Hola' en un fichero. El constructor recibe la ruta al fichero y lo guarda en una variable privada llamada path.

En el método count(), se define la expresión regular '/Hola/g' que es el patrón que queremos ver cuantas veces se repite. Tambien definimos cat y grep, ambos procesos hijos. El primero ejecuta el comando cat y la ruta al fichero y el segundo grep con 'Hola' que es la palabra que queremos contar y el comando grep nos devuelve las lineas en las que aparece. Se ejecuta el proceso cat haciendo uso de pipe() recibiendo como argumento el proceso grep. 

Luego tomamos la salida del comando y mediante la función match(), que nos devuelve un array con las veces que se encuentra una expresión regular en un string, encontramos las veces que aparece nuestra expresion regular definida previamente en la salida del comando. Por lo tanto, la longitud de este array que nos devuelve match() es la cantidad de veces que está la palabra 'Hola' en el fichero.

export class CountWords {
    constructor(
        private path: string
    ) {}

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


## Ejercicio 3
Se ha creado la clase Watch. El constructor recibe la ruta que se va a obervar y la almacena en una atributo privado de tipo string. La función watchDir comprueba si la ruta existe, en caso afirmativo se queda a la escucha mediante el método fs.watch(). Cuando se produce un cambio se emite un evento, dependiendo de el evento que emita la función se ejecuta una acción u otra.

En caso que el evento se de tipo change, significa que se ha modificado un archivo. En este caso se imprime el archivo que ha sido modificado y el contenido de dicho fichero. En caso que el evento sea de tipo rename es que se ha creado o eliminado un archivo. Se comprueba si el archivo exite, si es asi es que ha sido creado en caso negativo es que ha sido eliminado, en ambos casos se imprime por pantalla esta información.

    export class Watch {
        constructor(
            private path:string
        ) {}

        public watchDir() {
            if (!fs.existsSync(this.path)) {
                console.log(chalk.red("No se ha encontrado la ruta indicada"));
                exit(0);
            }

            fs.watch(`${this.path}`, (eventType, file) => {
                if (eventType === 'change') {
                    console.log(`El fichero ${this.path} ha sido modificado`);
                    const dataFile = fs.readFileSync(this.path +'/' + file, 'utf-8');
                    console.log(chalk.yellow(dataFile.toString()));
                } else if (eventType === 'rename') {
                    if (fs.existsSync(this.path +'/' + file)) {
                        console.log(chalk.grey('Se ha creado el fichero', file));
                    } else {
                        console.log(chalk.grey('Se ha borrado el fichero', file));
                    }             
                }
            });
        }
    }


## Ejercicio 4
Para este ejercicio, se ha creado un index donde se recibe por línea de comadandos la ruta de la acción que se quiere realizar y se instancia una clase que gestiona la ejecución independientemente, las cuales están explicadas a continuación

    yargs.command({
        command: 'mkdir',
        describe: 'Create a new drectory',
        builder: {
            path: {
                describe: 'Path of the new directory',
                demandOption: true,
                type: 'string'
            },
        },
        handler(argv) {
            let createDirectory: Mkdir = new Mkdir(`${argv.path}`);
            createDirectory.logic();
        },
    });

    yargs.command({
        command: 'ls',
        describe: 'List the content from a drectory',
        builder: {
            path: {
                describe: 'Path of the directory',
                demandOption: true,
                type: 'string'
            },
        },
        handler(argv) {
            let listDirectory: Ls = new Ls(`${argv.path}`);
            listDirectory.logic();
        },
    });

    yargs.command({
        command: 'cat',
        describe: 'List the content from a archive',
        builder: {
            path: {
                describe: 'Path of the archive',
                demandOption: true,
                type: 'string'
            },
        },
        handler(argv) {
            let showArchive: Cat = new Cat(`${argv.path}`);
            showArchive.logic();
        },
    });

    yargs.command({
        command: 'rm',
        describe: 'Remove a file or a directory',
        builder: {
            path: {
                describe: 'Path of the file or directory',
                demandOption: true,
                type: 'string'
            },
        },
        handler(argv) {
            let remove: Rm = new Rm(`${argv.path}`);
            remove.logic();
        },
    });

    yargs.command({
        command: 'whatis',
        describe: 'Is a directory or a file',
        builder: {
            path: {
                describe: 'Path of the file or directory',
                demandOption: true,
                type: 'string'
            },
        },
        handler(argv) {
            let whatis: Whatis = new Whatis(`${argv.path}`);
            whatis.logic();
        },
    });

### Mostrar contenido de un archivo
La clase Cat, recibe en el constructor la ruta del fichero que se quiere mostrar y la función logic() lee el fihero mediante la función fs.readFile() y lo muestra por pantalla. En caso de error al leer se muestra el error que devuelve dicha función por pantalla

    export class Cat {
        constructor(
            private path: string
        ) {}

        public logic() {
            fs.readFile(this.path, 'utf8', function(err, data) {
                if (err) {
                    console.log(chalk.yellow('No se pudo mostrar el contenido del archivo: ', this.path))
                    return console.error(err);
                } else {
                    console.log(chalk.blue(data))
                }
            });
        }
    };

### Listar contenido de un directorio
La clase Ls, recibe en el constructor la ruta del directorio que se quiere listar. La función logic(), lee el contenido del directorio mediante la funcion fs.readdir y muestra por pantalla uno a uno su contenido. En caso de error se muestra por pantalla el error que devuelva dicha función.

    export class Ls {
        constructor(
            private path: string
        ) {}

        public logic() {
            fs.readdir(this.path, (err, files) => {
                if (err) {
                    console.log(chalk.yellow('No se pudo listar el directorio: ', this.path))
                    return console.error(err);
                } else {
                    files.forEach(file => {
                        console.log(" -", file);
                    });
                }
            });
        }
    };


### Crear una carpeta
La clase Mkdir, recibe en el constructor la ruta del directorio que se quiere crear. La función logic(), crea el directorio mediante la funcion fs.mkdir. En caso de error se muestra por pantalla el error que devuelva dicha función.

    export class Mkdir {
        constructor(
            private path: string
        ) {}

        public logic() {
            fs.mkdir(this.path, (err) => {
                if (err) {
                    console.log(chalk.yellow('No se pudo crear el directorio: ', this.path))
                    return console.error(err);
                } else {
                    console.log(chalk.green('Se creó el directorio:', chalk.yellow(this.path), 'correctamente'))
                }
            });

        }
    };

### Borrar un directorio o archivo
La clase Rm, recibe en el constructor la ruta del directorio o archivo que se quiere borrar. La función logic(), comprueba si se trata de un fichero o un directorio, en caso de ser un directorio lo elimina mediante la funcion fs.rmdir(). Si se trata de un fichero se elimina mediante la función fs.unlink(). En caso de error se muestra por pantalla el error que devuelven dichas funciónes.

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

### Comprobar si se trata de un fichero o un directorio
La clase Whatiss, recibe en el constructor la ruta que se quiere comprobar. La función logic(), comprueba si se trata de un fichero o directorio mediante la función fs.lstat(), isDirectory() y isFile(). En caso de error se muestra por pantalla el error que devuelven dichas funciónes.

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
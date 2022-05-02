"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyNote = exports.ReadNote = exports.ListNotes = exports.RemoveNote = exports.AddNote = void 0;
const chalk = require("chalk");
const fs = require("fs");
/**
 * Clase para gestionar el añadido de una nota
 */
class AddNote {
    /**
     * Recibe el usuario titulo, cuerpo y color de la nota para crear un json en el directorio del usuario
     * @param user string
     * @param title string
     * @param body string
     * @param color string
     */
    constructor(user, title, body, color) {
        this.user = user;
        this.title = title;
        this.body = body;
        this.color = color;
    }
    /**
     * Implementa la lógica para añadir la nota
     */
    logic() {
        if (!fs.existsSync(`notes/${this.user}`)) {
            fs.mkdirSync(`notes/${this.user}`);
        }
        if (!fs.existsSync(`notes/${this.user}/${this.title}.json`)) {
            const note = { title: this.title,
                body: this.body,
                color: this.color
            };
            const noteStringlify = JSON.stringify(note);
            fs.writeFileSync(`notes/${this.user}/${this.title}.json`, noteStringlify);
            console.log(chalk.green('Se añadió la nota correctamente'));
        }
        else {
            console.log(chalk.red('Ya existe una nota con ese nombre'));
        }
    }
}
exports.AddNote = AddNote;
/**
 * Clase para gestionar la eliminación de una nota
 */
class RemoveNote {
    /**
     * Recibe el usuario y el titulo de la nota para eliminar el fichero json correspondiente a dicha nota
     * @param user string
     * @param title string
     */
    constructor(user, title) {
        this.user = user;
        this.title = title;
    }
    /**
     * Implementa la lógica para eliminar la nota
     */
    logic() {
        if (fs.existsSync(`notes/${this.user}`)) {
            if (fs.existsSync(`notes/${this.user}/${this.title}.json`)) {
                fs.rmSync(`notes/${this.user}/${this.title}.json`);
                console.log(chalk.green('Se eliminó la nota correctamente'));
            }
            else {
                console.log('No existe una nota con ese nombre');
            }
        }
        else {
            console.log(chalk.red('No existe registro del usuario'));
        }
        if (fs.readdirSync(`notes/${this.user}`).length === 0) {
            fs.rmdirSync(`notes/${this.user}`);
        }
    }
}
exports.RemoveNote = RemoveNote;
/**
 * Clase para gestionar el listado de las notas de un usuario
 */
class ListNotes {
    /**
     * Recibe el nombre del usuario para listar los títulos de todas sus notas
     * @param user string
     */
    constructor(user) {
        this.user = user;
    }
    /**
     * Implementa la lógica para el listado de las notas
     */
    logic() {
        if (fs.existsSync(`notes/${this.user}`)) {
            console.log(chalk.green(`Notas de ${this.user}`));
            fs.readdirSync(`notes/${this.user}`).forEach((file) => {
                const noteJson = fs.readFileSync(`notes/${this.user}/${file}`);
                const note = JSON.parse(noteJson.toString());
                switch (note.color) {
                    case 'red':
                        console.log(chalk.red(`${note.title}`));
                        break;
                    case 'blue':
                        console.log(chalk.blue(`${note.title}`));
                        break;
                    case 'yellow':
                        console.log(chalk.yellow(`${note.title}`));
                        break;
                    case 'green':
                        console.log(chalk.green(`${note.title}`));
                        break;
                }
            });
        }
        else
            console.log(chalk.red('No existen notas del usuario'));
    }
}
exports.ListNotes = ListNotes;
/**
 * Clase para gestionar la lectura de una nota
 */
class ReadNote {
    /**
     * Recibe el usuario y el título de la nota que se quiere leer
     * @param user string
     * @param title string
     */
    constructor(user, title) {
        this.user = user;
        this.title = title;
    }
    /**
     * Implementa la lógica para la lectura de una nota
     */
    logic() {
        if (fs.existsSync(`notes/${this.user}`)) {
            if (fs.existsSync(`notes/${this.user}/${this.title}.json`)) {
                const json = fs.readFileSync(`notes/${this.user}/${this.title}.json`);
                const note = JSON.parse(json.toString());
                switch (note.color) {
                    case 'red':
                        console.log(chalk.red(`TITLE: ${note.title}\n`));
                        console.log(chalk.red(`${note.body}`));
                        break;
                    case 'blue':
                        console.log(chalk.blue(`TITLE: ${note.title}\n`));
                        console.log(chalk.blue(`${note.body}`));
                        break;
                    case 'yellow':
                        console.log(chalk.yellow(`TITLE: ${note.title}\n`));
                        console.log(chalk.yellow(`${note.body}`));
                        break;
                    case 'green':
                        console.log(chalk.green(`TITLE: ${note.title}\n`));
                        console.log(chalk.green(`${note.body}`));
                        break;
                }
            }
            else
                console.log('No existe una nota con ese nombre');
        }
        else
            console.log(chalk.red('No existe registro del usuario'));
    }
}
exports.ReadNote = ReadNote;
/**
 * Clase para gestionar el modificado de una nota
 */
class ModifyNote {
    /**
     * Recibe el usuario y el título de la nota que se quiere modificar y su nuevo contenido
     * @param user string
     * @param title string
     * @param body string
     * @param color string
     */
    constructor(user, title, body, color) {
        this.user = user;
        this.title = title;
        this.body = body;
        this.color = color;
    }
    /**
     * Implementa la lógica para la modificación de una nota
     */
    logic() {
        if (fs.existsSync(`notes/${this.user}`)) {
            if (fs.existsSync(`notes/${this.user}/${this.title}.json`)) {
                const note = {
                    title: this.title,
                    body: this.body,
                    color: this.color
                };
                const noteStringlify = JSON.stringify(note);
                fs.writeFileSync(`notes/${this.user}/${this.title}.json`, noteStringlify);
                console.log(chalk.green('Se modificó la nota correctamente'));
            }
            else {
                console.log('No existe una nota con ese nombre');
            }
        }
        else {
            console.log(chalk.red('No existe registro del usuario'));
        }
    }
}
exports.ModifyNote = ModifyNote;

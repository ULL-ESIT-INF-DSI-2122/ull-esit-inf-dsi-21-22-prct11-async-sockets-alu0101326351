"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const manager_1 = require("./manager");
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'Owner of the note',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' &&
            typeof argv.title === 'string' &&
            typeof argv.body === 'string' &&
            typeof argv.color === 'string') {
            let addNote = new manager_1.AddNote(argv.user, argv.title, argv.body, argv.color);
            addNote.logic();
        }
    },
});
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        user: {
            describe: 'Owner of the note',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' &&
            typeof argv.title === 'string') {
            let removeNote = new manager_1.RemoveNote(argv.user, argv.title);
            removeNote.logic();
        }
    },
});
yargs.command({
    command: 'list',
    describe: 'List all the notes of a user',
    builder: {
        user: {
            describe: 'Owner of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string') {
            let listNote = new manager_1.ListNotes(argv.user);
            listNote.logic();
        }
    },
});
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        user: {
            describe: 'Owner of the note',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' &&
            typeof argv.title === 'string') {
            let readNote = new manager_1.ReadNote(argv.user, argv.title);
            readNote.logic();
        }
    },
});
yargs.command({
    command: 'modify',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'Owner of the note',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color of the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' &&
            typeof argv.title === 'string' &&
            typeof argv.body === 'string' &&
            typeof argv.color === 'string') {
            let modifyNote = new manager_1.ModifyNote(argv.user, argv.title, argv.body, argv.color);
            modifyNote.logic();
        }
    },
});
yargs.parse();

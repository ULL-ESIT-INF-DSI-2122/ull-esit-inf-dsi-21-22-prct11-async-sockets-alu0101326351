import yargs = require("yargs");
import { Cat } from "./Cat";
import { Ls } from "./Ls";
import { Mkdir } from "./Mkdir";
import { Rm } from "./Rm";
import { Whatis } from "./Whatis.ts";

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

yargs.parse();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const Cat_1 = require("./Cat");
const Ls_1 = require("./Ls");
const Mkdir_1 = require("./Mkdir");
const Rm_1 = require("./Rm");
const Whatis_ts_1 = require("./Whatis.ts");
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
        let createDirectory = new Mkdir_1.Mkdir(`${argv.path}`);
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
        let listDirectory = new Ls_1.Ls(`${argv.path}`);
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
        let showArchive = new Cat_1.Cat(`${argv.path}`);
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
        let remove = new Rm_1.Rm(`${argv.path}`);
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
        let whatis = new Whatis_ts_1.Whatis(`${argv.path}`);
        whatis.logic();
    },
});
yargs.parse();

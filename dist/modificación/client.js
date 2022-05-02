"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const net = require("net");
const client = net.connect({ port: 60300 });
const command = process.argv[2];
const flags = [];
let i = 3;
while (process.argv[i] != undefined) {
    flags.push(process.argv[i]);
    ++i;
}
let message = `{"command": "${command}", "flags": "${flags}"}`;
const messageJSON = JSON.parse(message);
client.write(JSON.stringify(messageJSON));
client.on('data', (data) => {
    console.log(chalk.yellow(data.toString()));
});

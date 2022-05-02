import chalk = require('chalk');
import * as net from 'net';
import { exit } from 'process';

const client = net.connect({port: 60300});
const command: string = process.argv[2];
const flags = []
let i = 3;

while(process.argv[i] != undefined) {
    flags.push(process.argv[i]);
    ++i;
}

let message: string = `{"command": "${command}", "flags": "${flags}"}`

const messageJSON = JSON.parse(message);
client.write(JSON.stringify(messageJSON));

client.on('data', (data) => {
    console.log(chalk.yellow(data.toString()));
});

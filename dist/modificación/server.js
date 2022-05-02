"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const net = require("net");
net.createServer((connection) => {
    console.log('Nueva peticion');
    connection.on('data', (data) => {
        const message = JSON.parse(data.toString());
        const command = (0, child_process_1.spawn)(message.command, [message.flags]);
        command.stdout.on('data', (data) => {
            connection.write(data.toString());
        });
    });
}).listen(60300, () => {
    console.log('Waiting for clients to connect.');
});

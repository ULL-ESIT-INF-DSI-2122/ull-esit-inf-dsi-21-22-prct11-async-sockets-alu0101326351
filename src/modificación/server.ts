import chalk = require('chalk');
import { spawn } from 'child_process';
import { connect } from 'http2';
import * as net from 'net';

net.createServer((connection) => {
  console.log('Nueva peticion');

  connection.on('data', (data) => {

    const message = JSON.parse(data.toString());
    const command = spawn(message.command, [message.flags]);

    command.stdout.on('data', (data) => {
        connection.write(data.toString());
    });

});

}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});

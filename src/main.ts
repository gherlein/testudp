import dgram = require('dgram');
let count = 0;

const server = dgram.createSocket('udp4');
server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});
server.on('message', (msg, senderInfo) => {
    console.log('udp (' + senderInfo.address + ') [' + count + ']: ' + msg);
    count += 1;
});
server.on('listening', () => {
    const address = server.address();
    console.log(`server listening on ${address.address}:${address.port}`);
});
server.bind(5500);

// https://stackoverflow.com/questions/11290553/node-js-udp-data-lost-at-high-package-rates

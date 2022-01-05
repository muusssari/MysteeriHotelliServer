import express from 'express';
import path from 'path';

import { SocketListener } from './src/socketController';


const app = express()
const server = require('http').Server(app);

//app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
//app.use('/public', express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 2000;
const socketController = new SocketListener(server);


app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/test.html');
});




server.listen(port, () => {
  console.log("server started: ", port)
});
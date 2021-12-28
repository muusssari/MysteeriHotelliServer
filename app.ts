import express from 'express';
import path from 'path';

const app = express()
const serv = require('http').Server(app)
const io = require('socket.io')(serv, {})

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 2000;
serv.listen(port, () => {
  console.log("server started: ", port)
});
import http from 'node:http';
import express from 'express';
import { Server } from 'socket.io';
import path from 'node:path';

async function main() {
	const app = express();
	app.use(express.static(path.resolve('./public')));

	const sever = http.createServer(app);
	const io = new Server();

	io.attach(sever);

	io.on('connection', (socket) => {
        console.log(`A new socket has connected4 ${socket.id}`);
        
        socket.on('user:message', (data) => {
            console.log("message from socket :", data);
            socket.broadcast.emit('server:message', data);
        })

        socket.on('user:typing', () => {
            console.log("User is typing :", socket.id);
            socket.broadcast.emit("server:typing", { id: socket.id });
        })
	}); 

	sever.listen(8000, () => {
		console.log(`Sever is listening port 8000`);
	});
}

main();

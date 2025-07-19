import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);
  const io = new SocketIOServer(server, {
    path: '/api/socket',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const connectedUsers: Record<string, string> = {};

  io.on('connection', (socket) => {
    console.log('🟢 New client connected:', socket.id);

    socket.on('register', (wallet) => {
      connectedUsers[wallet] = socket.id;
      console.log(`✅ Registered ${wallet} with ${socket.id}`);
    });

    socket.on('send-message', ({ to, from, message }) => {
      const recipientSocketId = connectedUsers[to];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receive-message', { from, message });
        console.log(`📤 Sent private message from ${from} to ${to}`);
      } else {
        console.log(`❌ Recipient ${to} is not connected.`);
      }
    });

    socket.on('disconnect', () => {
      for (const wallet in connectedUsers) {
        if (connectedUsers[wallet] === socket.id) {
          delete connectedUsers[wallet];
          console.log(`❌ ${wallet} disconnected`);
        }
      }
    });
  });

  expressApp.all('*', (req, res) => handle(req, res));
  server.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
});

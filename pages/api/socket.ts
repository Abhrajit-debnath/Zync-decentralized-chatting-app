

import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import redis from "@/lib/storage/redis";
import { getChatkey } from '@/helpers/fetchchatkey';
// This file persists in-memory between hot reloads or handler calls
import connectedUsers from "@/lib/socket/connectedusers";


type NextApiResponseWithSocket = NextApiResponse & {
    socket: {
        server: HTTPServer & {
            io?: IOServer;
        };
    };
};



interface messagePayload {
    from: string
    message: string
    time: string
}

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
    if (!res.socket.server.io) {
        const httpServer = res.socket.server as HTTPServer;
        const ioServer = new IOServer(httpServer, {
            path: '/api/socket',
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });

        res.socket.server.io = ioServer;

        ioServer.on('connection', (socket) => {
            console.log(connectedUsers);




            console.log('🟢 New client connected:', socket.id);


            socket.on("send-chat-request", async ({ from, to }) => {
                await redis.sadd(`chat:request:${to}`, from)

                const socketId = connectedUsers[to]
                if (socketId) {
                    ioServer.to(socketId).emit("incoming-chat-request", {
                        from
                    })
                }
            })

            socket.on("accept-chat-request", async ({ from, to }) => {
                await redis.sadd(`chat:accept:${to.toLowerCase()}`, from.toLowerCase());
                await redis.sadd(`chat:accept:${from.toLowerCase()}`, to.toLowerCase());
                await redis.srem(`chat:request:${to.toLowerCase()}`, from.toLowerCase());


                const fromsocketId = connectedUsers[from]
                const tosocketId = connectedUsers[to.toLowerCase()];

                if (fromsocketId) {
                    ioServer.to(fromsocketId).emit("chat-request-accepted", { by: to, socketId: tosocketId })
                }
            })

            socket.on('register', (walletAddress: string) => {
                const normalized = walletAddress.toLowerCase();
                connectedUsers[normalized] = socket.id;
                console.log("✅ Registered:", normalized, "->", socket.id);
                console.log("🧾 Connected Users:", connectedUsers);
            });



            socket.on('send-message', async ({ to, from, message }) => {

                const isAccepted = await redis.sismember(`chat:accept:${from}`, to)
                if (isAccepted) {
                    const now = new Date();
                    const time = now.toLocaleTimeString([], {
                        hour: 'numeric', minute: '2-digit'
                    })
                    const messagePayload: messagePayload = { from, message, time }
                    const key = getChatkey(from.toLowerCase(), to.toLowerCase());
                    await redis.rpush(key, JSON.stringify(messagePayload));

                    // const key = getChatkey(from, to)

                    //     const messageId = crypto.randomUUID()
                    //     const messageKey = `chat:msg:${messageId}`
                    //    const payload = JSON.stringify(messagePayload);

                    //     // storing in redis 
                    //     // await redis.set(messageKey, payload, 'EX', 3600)
                    //     // await redis.rpush(key, messageKey)

                    //     await redis.rpush(key, payload);


                    const normalizedTo = to.toLowerCase();
                    const recipientSocketId = connectedUsers[normalizedTo];
                    if (recipientSocketId) {
                        ioServer.to(recipientSocketId).emit('receive-message', messagePayload);

                        console.log("📤 Server emitting receive-message:", messagePayload);
                        console.log(`📤 Sent private message from ${from} to ${to} ${time}`);
                    } else {
                        socket.emit('error-message', `Recipient ${to} is not connected.`);
                    }
                } else {
                    socket.emit('error-message', "Message not sent")
                }

            });

            socket.on('disconnect', () => {
                console.log('🔴 Client disconnected:', socket.id);
                for (const wallet in connectedUsers) {
                    if (connectedUsers[wallet] === socket.id) {
                        delete connectedUsers[wallet];
                        console.log(`❌ Removed wallet ${wallet}`);
                        break;
                    }
                }
            });
        });

        console.log('✅ Socket.IO server initialized');
    } else {
        console.log('⚠️ Socket.IO server already running');
    }

    res.end();
} 
// import Redis from 'ioredis';
// import { useWallet } from '../wallet/Usewallet';
// import socket from '../socket/client';

// const {address}= useWallet()

// const redis = new Redis({
//     host: 'localhost',
//     port: 6379
// })
// socket.emit("register",address)

// export default redis



// /lib/redis.ts
import Redis from "ioredis";
const redis = new Redis(); // default localhost:6379
export default redis;

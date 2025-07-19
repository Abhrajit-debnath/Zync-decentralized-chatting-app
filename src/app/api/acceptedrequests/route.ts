// /pages/api/acceptedrequests.ts or /api/acceptedrequests/route.ts

import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/storage/redis";
import connectedUsers from "@/lib/socket/connectedusers"; 

export async function POST(req: NextRequest) {
    const { from } = await req.json();

    if (!from) {
        return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
    }

    const accepted = await redis.smembers(`chat:accept:${from.toLowerCase()}`);

    const acceptedWithSocket = accepted.map(address => ({
        address,
        socketId: connectedUsers[address.toLowerCase()] || null
    }));

    return NextResponse.json({ AcceptedchatRequests: acceptedWithSocket });
}

import redis from "@/lib/storage/redis";
import { NextRequest, NextResponse } from "next/server";
import { getChatkey } from "@/helpers/fetchchatkey";

export async function POST(req: NextRequest) {
    try {
        const { to, from } = await req.json();
        const chatkey = getChatkey(from.toLowerCase(), to.toLowerCase());
        const messagesRaw = await redis.lrange(chatkey, 0, -1);
        const messages = messagesRaw.map(msg => JSON.parse(msg));


        return NextResponse.json({ messages });
    } catch (err) {
        console.error("❌ Error fetching messages:", err);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

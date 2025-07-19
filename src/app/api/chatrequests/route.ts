import { NextResponse,NextRequest } from "next/server";
import redis from "@/lib/storage/redis";

export async function POST(req:NextRequest) {
    const {walletAddress} =  await req.json()

    if (!walletAddress) {
        return NextResponse.json({
            error:"Missing wallet Address"
        })
    }


    const fromList = await redis.smembers(`chat:request:${walletAddress.toLowerCase()}`)
    console.log(fromList);
    
    return NextResponse.json({chatRequests:fromList})
}
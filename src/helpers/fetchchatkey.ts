export function getChatkey(user1:string,user2:string) {
    const [a,b]=[user1.toLowerCase(), user2.toLowerCase()].sort();
    return `chat:messages:${a}:${b}`
}
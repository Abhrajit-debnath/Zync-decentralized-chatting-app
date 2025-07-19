// This file persists in-memory between hot reloads or handler calls
const connectedUsers: Record<string, string> = {};

export default connectedUsers;

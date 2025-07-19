'use client';
import { ReactNode, useEffect } from 'react';
import socket from '@/lib/socket/client';

export default function SocketProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const initSocket = async () => {
            await fetch('/api/socket');
            if (!socket.connected) {
                socket.connect();
            }
        };
        initSocket();
    }, []);
    return <>{children}</>;
}

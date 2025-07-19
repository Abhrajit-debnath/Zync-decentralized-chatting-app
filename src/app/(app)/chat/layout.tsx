import PrivateRoute from '@/components/Privateroute'
import SocketProvider from '@/components/SocketProvider';
export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <PrivateRoute>
            <SocketProvider>
                {children}
            </SocketProvider>
        </PrivateRoute>
    );
}

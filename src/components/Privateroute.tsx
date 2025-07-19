'use client';

import { useWallet } from '@/lib/wallet/Usewallet';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isConnected, status } = useWallet();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (status === 'pending') return;

    if (!isConnected) {
      router.push('/connect-wallet');
    } else {
      setChecked(true);
    }
  }, [isConnected, status]);

  if (!checked) return null;

  return <>{children}</>;
}

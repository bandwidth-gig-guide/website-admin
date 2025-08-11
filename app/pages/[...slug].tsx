import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CatchAll() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
}

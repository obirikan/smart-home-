
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'expo-router';
import { useAuth } from '@/Contex_API';
import LoadingScreen from './LoadingScreen';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth = true }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; 

    const isAuthPage = pathname?.includes('auth') || pathname?.includes('login') || pathname?.includes('register');

    if (requireAuth && !user && !isAuthPage) {
      console.log(' Access denied, redirecting to login');
      router.replace('/login');
    } else if (!requireAuth && user && isAuthPage) {
      console.log(' User already authenticated, redirecting to home');
      router.replace('/homepage');
    }
  }, [user, loading, requireAuth, router, pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (requireAuth && !user) {
    return <LoadingScreen />;
  }
  if (!requireAuth && user) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default AuthGuard;
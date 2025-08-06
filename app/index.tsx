import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/Contex_API';
import { useStoredUser } from '@/hooks/useStoredUser';
import LoadingScreen from '@/components/LoadingScreen';

export default function Index() {
  const { user, loading: authLoading } = useAuth();
  const { storedUser, loading: storageLoading, hasStoredUser } = useStoredUser();
  const router = useRouter();

  useEffect(() => {
    console.log('📊 Index Page State:', {
      authLoading,
      storageLoading,
      hasFirebaseUser: !!user,
      hasStoredUser,
      firebaseUserEmail: user?.email,
      storedUserEmail: storedUser?.email,
      storedUserTimestamp: storedUser?.timestamp ? new Date(storedUser.timestamp).toLocaleString() : null
    });
  }, [user, storedUser, authLoading, storageLoading, hasStoredUser]);

  useEffect(() => {
    if (authLoading || storageLoading) {
      console.log('⏳ Still loading...', { authLoading, storageLoading });
      return;
    }

    console.log('Determining navigation route...');

    if (user) {
      console.log(' Firebase user authenticated, navigating to home');
      router.replace('/homepage');
      return;
    }

    if (hasStoredUser && !user) {
      console.log(' Stored user found, waiting for Firebase restoration...');
      
      const timeoutId = setTimeout(() => {
        console.log('Firebase restoration timeout, navigating to login');
        router.replace('/login');
      }, 2500);

      return () => clearTimeout(timeoutId);
    }

    console.log(' No user found, navigating to login');
    router.replace('/login');

  }, [user, authLoading, storageLoading, hasStoredUser, router]);

  return <LoadingScreen />;
}
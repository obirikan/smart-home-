import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '@/Contex_API';
import { useRouter, useSegments } from 'expo-router';
import LoadingScreen from '@/components/LoadingScreen';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '/login';

    if (user && inAuthGroup) {
   
      console.log('User authenticated, redirecting to home');
      router.replace('/homepage');
    } else if (!user && !inAuthGroup) {

      console.log('User not authenticated, redirecting to login');
      // router.replace('/login');
    }
  }, [user, segments, loading]);

  useEffect(() => {
    if (!loading) {

      SplashScreen.hideAsync();
    }
  }, [loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="homepage" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
       <Stack.Screen name="signup" options={{ headerShown: false }} />
       <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
};

// the Root Layout with AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
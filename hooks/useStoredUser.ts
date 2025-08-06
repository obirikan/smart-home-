// hooks/useStoredUser.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_STORAGE_KEY } from '@/Contex_API';

interface StoredUserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  timestamp: number;
}

interface UseStoredUserReturn {
  storedUser: StoredUserData | null;
  loading: boolean;
  error: string | null;
  refreshStoredUser: () => Promise<void>;
  clearStoredUser: () => Promise<void>;
  hasStoredUser: boolean;
}

export const useStoredUser = (): UseStoredUserReturn => {
  const [storedUser, setStoredUser] = useState<StoredUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshStoredUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const storedData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      
      if (storedData) {
        const parsedData: StoredUserData = JSON.parse(storedData);
        if (parsedData.uid) {
          const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
          
          if (parsedData.timestamp > thirtyDaysAgo) {
            setStoredUser(parsedData);
            console.log(' Valid stored user data loaded');
          } else {
            console.log('Stored user data is too old, clearing...');
            await AsyncStorage.removeItem(USER_STORAGE_KEY);
            setStoredUser(null);
          }
        } else {
          console.log('Invalid stored user data, clearing...');
        //   await AsyncStorage.removeItem(USER_STORAGE_KEY);
        //   setStoredUser(null);
        }
      } else {
        setStoredUser(null);
        console.log('📱 No stored user data found');
      }
    } catch (err) {
      console.error(' Error loading stored user:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStoredUser(null);
    } finally {
      setLoading(false);
    }
  };

  const clearStoredUser = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setStoredUser(null);
      console.log('🗑️Stored user data cleared');
    } catch (err) {
      console.error('Error clearing stored user:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  useEffect(() => {
    refreshStoredUser();
  }, []);

  return {
    storedUser,
    loading,
    error,
    refreshStoredUser,
    clearStoredUser,
    hasStoredUser: !!storedUser,
  };
};
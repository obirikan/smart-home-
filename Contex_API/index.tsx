import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/firebase';
import { User } from 'firebase/auth';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  setUser: (user: User | null) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  isAuthenticated: false,
  setUser: async () => {},
});

export const USER_STORAGE_KEY = '@user_data';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🔄 Initializing authentication from storage...');
        const storedUserData = await AsyncStorage.getItem(USER_STORAGE_KEY);
        
        if (storedUserData) {
          console.log('📱 Found stored user data');
          const parsedUser = JSON.parse(storedUserData);
          setUserState(parsedUser);
        } else {
          console.log('📱 No stored user data found');
        }
      } catch (error) {
        console.error('❌ Error initializing auth:', error);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const setUser = async (user: User | null) => {
    try {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          //we will be adding more stuff here for now this x jsut basic
        };
        
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        setUserState(userData as any); 
        console.log('💾 User data stored successfully');
      } else {
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
        setUserState(null);
        console.log('🗑️ User data cleared from storage');
      }
    } catch (error) {
      console.error('❌ Error setting user:', error);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUserState(null);
      console.log('✅ User logged out successfully');
    } catch (error) {
      console.error('❌ Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
    setUser,
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
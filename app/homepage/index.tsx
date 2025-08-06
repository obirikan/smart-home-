// app/(tabs)/home.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/Contex_API';
import AuthGuard from '@/components/AuthGuard';

const HomeContent = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const socketData = {
    socket1: {
      current: 2.5,
      power: 575,
      energy: 1.2,
      temperature: 42,
      status: true,
      name: "Living Room"
    },
    socket3: {
      current: 2.5,
      power: 575,
      energy: 1.2,
      temperature: 42,
      status: true,
      name: "Living Room"
    },
    socket2: {
      current: 1.8,
      power: 432,
      energy: 0.8,
      temperature: 38,
      status: false,
      name: "Bedroom"
    }
  };

  const toggleSocket = (socketId) => {
    console.log(`Toggling socket ${socketId}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Smart Socket Monitor</Text>
          <Text style={styles.headerSubtitle}>Welcome, {user?.email}</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable onPress={() => router.push('/homepage/settings')} style={styles.headerButton}>
            <MaterialIcons name="settings" size={24} color="#fff" />
          </Pressable>
          <Pressable onPress={handleLogout} style={styles.headerButton}>
            <MaterialIcons name="logout" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Status Cards */}
        <View style={styles.cardRow}>
          <View style={styles.statusCard}>
            <MaterialCommunityIcons name="power-socket-us" size={40} color="#4CAF50" />
            <Text style={styles.cardTitle}>Socket 1</Text>
            <Text style={styles.cardSubtitle}>{socketData.socket1.name}</Text>
            <View style={[styles.statusIndicator, { backgroundColor: socketData.socket1.status ? '#4CAF50' : '#F44336' }]}>
              <Text style={styles.statusText}>{socketData.socket1.status ? 'ON' : 'OFF'}</Text>
            </View>
          </View>

          <View style={styles.statusCard}>
            <MaterialCommunityIcons name="power-socket-eu" size={40} color="#2196F3" />
            <Text style={styles.cardTitle}>Socket 2</Text>
            <Text style={styles.cardSubtitle}>{socketData.socket2.name}</Text>
            <View style={[styles.statusIndicator, { backgroundColor: socketData.socket2.status ? '#4CAF50' : '#F44336' }]}>
              <Text style={styles.statusText}>{socketData.socket2.status ? 'ON' : 'OFF'}</Text>
            </View>
          </View>
        </View>

        {/* Quick Control Panel */}
        <View style={styles.controlPanel}>
          <Text style={styles.sectionTitle}>Quick Controls</Text>
          <View style={styles.controlButtons}>
            <Pressable 
              style={[styles.controlButton, { backgroundColor: socketData.socket1.status ? '#F44336' : '#4CAF50' }]}
              onPress={() => toggleSocket('socket1')}
            >
              <Text style={styles.controlButtonText}>
                {socketData.socket1.status ? 'Turn Off Socket 1' : 'Turn On Socket 1'}
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.controlButton, { backgroundColor: socketData.socket2.status ? '#F44336' : '#4CAF50' }]}
              onPress={() => toggleSocket('socket2')}
            >
              <Text style={styles.controlButtonText}>
                {socketData.socket2.status ? 'Turn Off Socket 2' : 'Turn On Socket 2'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Real-time Data */}
        <View style={styles.dataSection}>
          <Text style={styles.sectionTitle}>Current Readings</Text>
          
          <View style={styles.dataGrid}>
            {/* Socket 1 Data */}
            <View style={styles.dataCard}>
              <Text style={styles.dataCardTitle}>Socket 1</Text>
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="lightning-bolt" size={20} color="#FFC107" />
                <Text style={styles.dataText}>{socketData.socket1.current} A</Text>
              </View>
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="flash" size={20} color="#FF5722" />
                <Text style={styles.dataText}>{socketData.socket1.power} W</Text>
              </View>
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="chart-line" size={20} color="#673AB7" />
                <Text style={styles.dataText}>{socketData.socket1.energy} kWh</Text>
              </View>
              <View style={styles.dataRow}>
                <MaterialIcons name="device-thermostat" size={20} color="#E91E63" />
                <Text style={styles.dataText}>{socketData.socket1.temperature} °C</Text>
              </View>
            </View>
            
            {/* Socket 2 Data */}
            <View style={styles.dataCard}>
              <Text style={styles.dataCardTitle}>Socket 2</Text>
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="lightning-bolt" size={20} color="#FFC107" />
                <Text style={styles.dataText}>{socketData.socket2.current} A</Text>
              </View>
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="flash" size={20} color="#FF5722" />
                <Text style={styles.dataText}>{socketData.socket2.power} W</Text>
              </View>
              <View style={styles.dataRow}>
                <MaterialCommunityIcons name="chart-line" size={20} color="#673AB7" />
                <Text style={styles.dataText}>{socketData.socket2.energy} kWh</Text>
              </View>
              <View style={styles.dataRow}>
                <MaterialIcons name="device-thermostat" size={20} color="#E91E63" />
                <Text style={styles.dataText}>{socketData.socket2.temperature} °C</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton} onPress={() => router.push('/history')}>
              <MaterialCommunityIcons name="history" size={24} color="#2196F3" />
              <Text style={styles.actionButtonText}>Usage History</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={() => router.push('/analytics')}>
              <MaterialCommunityIcons name="chart-bar" size={24} color="#4CAF50" />
              <Text style={styles.actionButtonText}>Analytics</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={() => router.push('/settings')}>
              <MaterialIcons name="settings" size={24} color="#9C27B0" />
              <Text style={styles.actionButtonText}>Settings</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Home = () => {
  return (
    <AuthGuard requireAuth={true}>
      <HomeContent />
    </AuthGuard>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#E3F2FD',
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  headerButton: {
    padding: 5,
  },
  content: {
    padding: 15,
    paddingBottom: 30,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statusIndicator: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 5,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  controlPanel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dataSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataCard: {
    width: '48%',
  },
  dataCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dataText: {
    marginLeft: 10,
    fontSize: 16,
  },
  quickActions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: '30%',
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
});
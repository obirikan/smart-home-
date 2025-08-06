import { StyleSheet, Text, View, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { auth } from '@/firebase';
import React from 'react';

const Settings = () => {
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          onPress: () => performLogout() 
        }
      ]
    );
  };

  const performLogout = async () => {
    try {
      await auth.signOut();
      router.replace('/login');
    } catch (error:any) {
      console.log("Logout Error", error.message);
    }
  };

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [refreshInterval, setRefreshInterval] = React.useState('5s');
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="notifications" size={24} color="#2196F3" />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: "#81c784" }}
              thumbColor={notificationsEnabled ? "#4CAF50" : "#f4f3f4"}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="dark-mode" size={24} color="#673AB7" />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#767577", true: "#9575cd" }}
              thumbColor={darkMode ? "#673AB7" : "#f4f3f4"}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="refresh" size={24} color="#FF9800" />
              <Text style={styles.settingText}>Refresh Interval</Text>
            </View>
            <Pressable 
              style={styles.valueButton}
              onPress={() => {/* Show interval picker */}}
            >
              <Text style={styles.valueText}>{refreshInterval}</Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} color="#666" />
            </Pressable>
          </View>
        </View>

        {/* Device Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Configuration</Text>
          
          <Pressable style={styles.settingItem} onPress={() => router.push('/settings/voltage')}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="lightning-bolt" size={24} color="#F44336" />
              <Text style={styles.settingText}>Voltage Reference</Text>
            </View>
            <View style={styles.valueButton}>
              <Text style={styles.valueText}>243V (Ghana)</Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} color="#666" />
            </View>
          </Pressable>
          
          <Pressable style={styles.settingItem} onPress={() => router.push('/settings/temperature')}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="device-thermostat" size={24} color="#E91E63" />
              <Text style={styles.settingText}>Temperature Warning</Text>
            </View>
            <View style={styles.valueButton}>
              <Text style={styles.valueText}>70°C</Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} color="#666" />
            </View>
          </Pressable>
          
          <Pressable style={styles.settingItem} onPress={() => router.push('/settings/connection')}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="connection" size={24} color="#009688" />
              <Text style={styles.settingText}>Connection Type</Text>
            </View>
            <View style={styles.valueButton}>
              <Text style={styles.valueText}>Wi-Fi</Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} color="#666" />
            </View>
          </Pressable>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <Pressable style={styles.settingItem} onPress={() => router.push('/settings/profile')}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="person" size={24} color="#3F51B5" />
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="#666" />
          </Pressable>
          
          <Pressable style={styles.settingItem} onPress={() => router.push('/settings/security')}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="security" size={24} color="#FF5722" />
              <Text style={styles.settingText}>Security</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="#666" />
          </Pressable>
          
          <Pressable style={styles.settingItem} onPress={() => router.push('/settings/help')}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="help-outline" size={24} color="#607D8B" />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="#666" />
          </Pressable>
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>

        {/* App Version */}
        <Text style={styles.versionText}>Smart Socket App v1.0.0</Text>
      </ScrollView>
    </View>
  );
};

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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
    paddingBottom: 30,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    paddingLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  valueButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  logoutText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 12,
  },
});

export default Settings;
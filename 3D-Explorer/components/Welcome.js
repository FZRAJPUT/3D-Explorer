import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({ navigation }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const isFirstLaunchStored = await AsyncStorage.getItem('isFirstLaunch');
      if (isFirstLaunchStored === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  const handleGetStarted = async () => {
    // Set the flag to false so the welcome screen doesn't show again
    await AsyncStorage.setItem('isFirstLaunch', 'false');
    navigation.replace('Home'); // Replace welcome screen with home screen
  };

  if (isFirstLaunch === null) {
    return null; // Show nothing while checking for first launch
  }

  if (!isFirstLaunch) {
    return null; // If it's not the first launch, don't show the welcome screen
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to EasyGo!</Text>
      <Text style={styles.description}>Explore our features and get started with your journey.</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;

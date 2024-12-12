import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  LinearGradient,
} from 'react-native';
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
    await AsyncStorage.setItem('isFirstLaunch', 'false');
    navigation.replace('Home');
  };

  if (isFirstLaunch === null || !isFirstLaunch) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1562158073-ae6f73a5e23c?auto=format&fit=crop&w=800&q=60',
        }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['#00000070', '#000000d0']}
          style={styles.gradientOverlay}
        >
          <Text style={styles.title}>Welcome to 3D Explorer!</Text>
          <Text style={styles.description}>
            Dive into immersive navigation and explore the world in 3D like never before.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.footer}>Developed by THE SMART MOVE</Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 18,
    color: '#f0f0f0',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 25,
  },
  button: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default WelcomeScreen;

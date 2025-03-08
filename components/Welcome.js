import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Correct import
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <LinearGradient
          colors={['#00000070', '#000000d0']}
          style={styles.gradientOverlay}
        >
          <Text style={styles.title}>Welcome to 3D Explorer!</Text>
          <Text style={styles.description}>
            Dive into immersive navigation and explore the world in 3D like never before.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.footer}>Developed by THE SMART MOVE</Text>
        </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#4B70F5',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#4B70F5',
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

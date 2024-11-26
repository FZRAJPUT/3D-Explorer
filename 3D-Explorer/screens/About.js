import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/directions-concept-illustration_114360-2268.jpg?ga=GA1.1.91514851.1732552122&semt=ais_hybrid' }} // Replace with a relevant image URL
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to 3D Explorer</Text>
        <Text style={styles.paragraph}>
          Experience the world in 3D with our cutting-edge platform that brings public spaces to life. From towering buildings to bustling stations, explore every detail like never before.
        </Text>
        
        <Text style={styles.subtitle}>Our Vision</Text>
        <Text style={styles.paragraph}>
          Our vision is to revolutionize how people interact with public spaces by providing immersive, interactive, and visually stunning 3D representations. We aim to make navigation and exploration seamless and engaging for everyone.
        </Text>
        
        <Text style={styles.subtitle}>Key Features</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• High-resolution 3D models of buildings and stations.</Text>
          <Text style={styles.listItem}>• Intuitive navigation for exploring complex areas.</Text>
          <Text style={styles.listItem}>• Integration with maps for real-time location guidance.</Text>
          <Text style={styles.listItem}>• Compatibility across devices for universal accessibility.</Text>
        </View>

        <Text style={styles.subtitle}>Join the Journey</Text>
        <Text style={styles.paragraph}>
          At 3D Explorer, we’re constantly pushing the boundaries of what’s possible. Whether you’re a traveler, a student, or just curious about the world, join us in exploring the future of spatial technology.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3949ab',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#424242',
    marginBottom: 15,
    textAlign: 'justify',
  },
  list: {
    marginLeft: 10,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#616161',
    marginBottom: 5,
  }
});

export default About;

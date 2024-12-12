import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/directions-concept-illustration_114360-2268.jpg?ga=GA1.1.91514851.1732552122&semt=ais_hybrid',
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to 3D Explorer</Text>
        <Text style={styles.paragraph}>
          Dive into the future of navigation with 3D Explorer, your ultimate platform for immersive exploration of public spaces. From intricate architectural models to intuitive navigation, we bring spaces to life like never before.
        </Text>
        
        <Text style={styles.subtitle}>Our Vision</Text>
        <Text style={styles.paragraph}>
          We aim to revolutionize how people experience the world by creating interactive 3D representations of spaces. Our platform empowers users to explore, navigate, and interact seamlessly with real-world environments, bridging the gap between technology and everyday life.
        </Text>
        
        <Text style={styles.subtitle}>Upload Maps (Admin Access Only)</Text>
        <View style={styles.upload}>
        <Text style={styles.paragraph}>
          The ability to upload maps is an exclusive feature for admins, ensuring the quality and accuracy of the content on our platform. Admins can contribute to the 3D Explorer community by adding new maps, enabling seamless navigation for all users. 
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Admins must provide a valid city name and map ID during the upload process.</Text>
          <Text style={styles.listItem}>• Uploaded maps undergo a validation process to ensure accuracy.</Text>
          <Text style={styles.listItem}>• Contributions help expand our platform’s reach and usability.</Text>
        </View>
        </View>

        <Text style={styles.subtitle}>Key Features</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• High-resolution 3D models with realistic details.</Text>
          <Text style={styles.listItem}>• Admin-exclusive map uploading feature for platform growth.</Text>
          <Text style={styles.listItem}>• Real-time location guidance and navigation.</Text>
          <Text style={styles.listItem}>• Cross-device compatibility for universal access.</Text>
        </View>

        <Text style={styles.subtitle}>Join the Journey</Text>
        <Text style={styles.paragraph}>
          At 3D Explorer, we’re not just reimagining spaces; we’re reimagining possibilities. Whether you’re an admin contributor, a navigator, or a curious explorer, join us in shaping the future of interactive navigation.
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
  },
  upload:{
    backgroundColor:"rgba(187, 245, 184, 0.2)",
    borderRadius:8,
    paddingHorizontal:8,
    borderWidth:1,
    borderColor:"#06D001"
  }
});

export default About;

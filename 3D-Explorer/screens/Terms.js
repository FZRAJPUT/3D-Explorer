import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

const TermsAndConditions = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    Alert.alert('Thank You!', 'You have accepted the terms and conditions.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Welcome to our application! By using this app, you agree to the following terms and conditions:
        </Text>
        <Text style={styles.text}>
          1. Usage: You are permitted to use the app for personal, non-commercial purposes only.
        </Text>
        <Text style={styles.text}>
          2. Privacy: We respect your privacy. Please review our Privacy Policy for details on how we handle your information.
        </Text>
        <Text style={styles.text}>
          3. Updates: We may update these terms from time to time. Continued use of the app constitutes acceptance of the revised terms.
        </Text>
        <Text style={styles.text}>
          4. Prohibited Actions: You agree not to misuse the app in any way, including unauthorized access, data scraping, or distribution of harmful content.
        </Text>
        <Text style={styles.text}>
          5. **Liability**: The app is provided "as is." We are not liable for any damages arising from your use of the app.
        </Text>
        <Text style={styles.text}>
          6. Termination: We reserve the right to terminate access to the app at our discretion.
        </Text>
        <Text style={styles.text}>
          By continuing to use this app, you agree to comply with these terms.
        </Text>
      </ScrollView>
      {!accepted && (
        <TouchableOpacity style={styles.button} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept Terms</Text>
        </TouchableOpacity>
      )}
      {accepted && (
        <Text style={styles.thankYouText}>
          Thank you for accepting the terms and conditions!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  thankYouText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default TermsAndConditions;

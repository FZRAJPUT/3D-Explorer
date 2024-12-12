import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapUpload = () => {
  const [place, setPlace] = useState('');
  const [mapId, setMapId] = useState('');
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state for uploads
  const [uploadingMapId, setUploadingMapId] = useState(null); // Track which map is being uploaded
  const [isPinModalVisible, setIsPinModalVisible] = useState(false); // PIN modal visibility
  const [enteredPin, setEnteredPin] = useState(''); // User-entered PIN
  const [selectedMap, setSelectedMap] = useState(null); // Map selected for upload

  const adminPin = '1234'; // Admin PIN

  useEffect(() => {
    const loadMapsFromStorage = async () => {
      try {
        const storedMaps = await AsyncStorage.getItem('maps');
        if (storedMaps) {
          setMaps(JSON.parse(storedMaps));
        }
      } catch (error) {
        console.error('Error loading maps from storage:', error);
      }
    };

    loadMapsFromStorage();
  }, []);

  const saveMapsToStorage = async (updatedMaps) => {
    try {
      await AsyncStorage.setItem('maps', JSON.stringify(updatedMaps));
    } catch (error) {
      console.error('Error saving maps to storage:', error);
    }
  };

  const handleUpload = () => {
    if (!place || !mapId) {
      Alert.alert('Error', 'Please provide both city name and map URL.');
      return;
    }

    const mapExists = maps.some(
      (map) =>
        map.mapId === mapId || map.place.trim().toUpperCase() === place.trim().toUpperCase()
    );
    if (mapExists) {
      Alert.alert('Error', 'This map has already been added.');
      return;
    }

    const newMap = { id: Date.now().toString(), place, mapId };
    const updatedMaps = [...maps, newMap];

    setMaps(updatedMaps);
    saveMapsToStorage(updatedMaps);

    setPlace('');
    setMapId('');
  };

  const uploadToServer = async (map) => {
    setUploadingMapId(map.id); // Set the map ID being uploaded
    setLoading(true); // Start loader

    try {
      const payload = {
        place: map.place, // City or place name
        mapId: map.mapId, // Unique Map ID
      };

      const response = await fetch(
        'https://threed-explorer.onrender.com/api/map/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        Alert.alert('Failed', data.message);
      } else {
        Alert.alert('Success', data.message);
      }
    } catch (error) {
      console.error('Upload Error:', error.message);
      Alert.alert('Error', error.message || 'Failed to upload the map.');
    } finally {
      setLoading(false);
      setUploadingMapId(null);
    }
  };

  const validatePinAndUpload = () => {
    if (enteredPin === adminPin) {
      setIsPinModalVisible(false);
      setEnteredPin('');
      if (selectedMap) {
        uploadToServer(selectedMap);
      }
    } else {
      Alert.alert('Access Denied', 'Incorrect PIN. Please try again.');
      setEnteredPin('');
    }
  };

  const promptPinForUpload = (map) => {
    setSelectedMap(map);
    setIsPinModalVisible(true);
  };

  const removeMap = (id) => {
    const updatedMaps = maps.filter((map) => map.id !== id);

    setMaps(updatedMaps);
    saveMapsToStorage(updatedMaps);
    Alert.alert('Success', 'Map removed from the list.');
  };

  const renderItem = ({ item }) => (
    <View style={styles.mapItem}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-psd/3d-rendering-camping-icon_23-2151192585.jpg',
        }}
        style={styles.mapImage}
      />
      <View style={styles.mapDetails}>
        <Text style={styles.mapText}>{item.place.trim().toUpperCase()}</Text>
        <View style={styles.mapActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => promptPinForUpload(item)}
            disabled={loading && uploadingMapId === item.id} // Disable button during upload
          >
            {loading && uploadingMapId === item.id ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.actionButtonText}>Upload</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#FF3B30' }]}
            onPress={() => removeMap(item.id)}
          >
            <Text style={styles.actionButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Please upload only valid city or place names & map IDs.Read more about uploading maps in About section.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="City or Place name"
        value={place}
        onChangeText={(value) => setPlace(value)}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="MapId"
        value={mapId}
        onChangeText={(value) => setMapId(value)}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Add to List</Text>
      </TouchableOpacity>

      <FlatList
        data={maps}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No maps added yet.</Text>
        }
      />

      {/* PIN Modal */}
      <Modal
        visible={isPinModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPinModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter PIN</Text>
            <TextInput
              style={styles.pinInput}
              placeholder="Enter Admin PIN"
              value={enteredPin}
              onChangeText={setEnteredPin}
              secureTextEntry
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.Button}
                onPress={validatePinAndUpload}
              >
                <Text style={styles.actionButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.Button, { backgroundColor: '#FF3B30' }]}
                onPress={() => setIsPinModalVisible(false)}
              >
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  infoText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#DCFFB7',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#06D001',
  },  
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  Button:{
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginRight: 10,
    width:80
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  list: {
    marginTop: 10,
  },
  mapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },
  mapImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 10,
  },
  mapDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapText: {
    fontSize: 18,
    color: '#444',
    fontWeight: '500',
  },
  mapActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalButtons:{
    gap:4,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around"
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginRight: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyList: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default MapUpload;

import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from 'react-native';

const MapUpload = () => {
  const [place, setPlace] = useState('');
  const [mapId, setMapId] = useState('');
  const [maps, setMaps] = useState([]);
  
  // Load saved maps from local storage on component mount
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

  // Save maps to local storage
  const saveMapsToStorage = async (updatedMaps) => {
    try {
      await AsyncStorage.setItem('maps', JSON.stringify(updatedMaps));
    } catch (error) {
      console.error('Error saving maps to storage:', error);
    }
  };

  // Add new map to the list and save to storage
  const handleUpload = () => {
    if (!place || !mapId) {
      Alert.alert('Error', 'Please provide both city name and map URL.');
      return;
    }

    // Check if map already exists
    const mapExists = maps.some((map) => map.mapId === mapId || map.place.toLowerCase() === place.toLowerCase());
    if (mapExists) {
      Alert.alert('Error', 'This map has already been uploaded.');
      return;
    }

    const newMap = { id: Date.now().toString(), place, mapId };
    const updatedMaps = [...maps, newMap];

    setMaps(updatedMaps);
    saveMapsToStorage(updatedMaps);

    setPlace('');
    setMapId('');
  };

  // Upload map to the server
  const uploadToServer = async (map) => {
    try {
      const response = await fetch('http://192.168.52.93:4000/api/map/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(map),
      });

      const data = await response.json();

      if (!data.success) {
        Alert.alert('Error', data.message || 'Failed to upload map.');
        return;
      }
      Alert.alert('Success', `Map for "${map.place.toLocaleUpperCase()}" uploaded successfully.`);
    } catch (error) {
      console.error('Upload Error:', error.message);
      Alert.alert('Error', 'Failed to upload the map. Please try again.');
    }
  };

  // Remove map from the list and update storage
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
          uri: 'https://img.freepik.com/free-psd/3d-rendering-camping-icon_23-2151192585.jpg?t=st=1732615107~exp=1732618707~hmac=e6ce031219fce425a831b46abb750634027d7a543427510824ded94abec63084&w=740', // Placeholder for missing URLs
        }}
        style={styles.mapImage}
      />
      <View style={styles.mapDetails}>
        <Text style={styles.mapText}>{item.place.toLocaleUpperCase()}</Text>
        <View style={styles.mapActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => uploadToServer(item)}
          >
            <Text style={styles.actionButtonText}>Upload</Text>
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
      <TextInput
        style={styles.input}
        placeholder="city or Place name"
        value={place.toLocaleLowerCase()}
        onChangeText={(value) => setPlace(value)}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="mapId"
        value={mapId.toLocaleLowerCase()}
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
    gap: 4,
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
});

export default MapUpload;

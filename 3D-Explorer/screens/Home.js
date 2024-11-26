import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from 'react-native';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [mapId, setMapId] = useState('');

  const getMap = async (city) => {
    try {
      const response = await fetch(`http://192.168.52.93:4000/api/map/list?place=${city}`);
      const data = await response.json();
      if (!data.success || !data.maps || data.maps.length === 0) {
        ToastAndroid.show('No map available!', ToastAndroid.LONG);
        return;
      }
      setMapId(data.maps[0].mapId);
    } catch (error) {
      console.error("Error fetching data:", error);
      ToastAndroid.show('Failed to fetch the map. Try again!', ToastAndroid.LONG);
    }
    setSearchText('')
  };
  
  useEffect(() => {
    getMap("Bathinda");
  }, []);

  const handleSearch = () => {
    if (searchText.trim() === '') {
      ToastAndroid.show('Please enter a city name!', ToastAndroid.SHORT);
      return;
    }

    getMap(searchText.toLowerCase());
  };

  const htmlCode = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/@mappedin/mappedin-js@6.0.1-alpha.4/lib/index.css"
          rel="stylesheet"
        />
        <title>Mappedin Web SDK v6 Getting Started with JSDelivr</title>
      </head>
      <body>
        <iframe 
          title="Mappedin Map" 
          allow="clipboard-write; web-share" 
          scrolling="no" 
          width="100%" 
          height="100%" 
          frameborder="0" 
          style="border:0" 
          src="https://app.mappedin.com/map/${mapId}?embedded=true">
        </iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a place..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} // Trigger search on Enter key press
          returnKeyType="search" // Customize the return key to "search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      {mapId ? (
        <WebView
          source={{ html: htmlCode }}
          style={styles.web}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Search for a city to load the map!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  web: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#aaa',
  },
});

export default Home;

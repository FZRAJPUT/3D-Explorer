import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Loader from "../components/Loader";
// import { MY_API_KEY } from '@env';

const Home = () => {
  const [searchText, setSearchText] = useState();
  const [mapId, setMapId] = useState("");

  useEffect(() => {
    getMap("bathinda");
  }, []);

  // school mall warehouse airport bathinda

  const getMap = async (city) => {
    try {
      const response = await fetch(
        `${process.env.MY_API_KEY}${city}`
      );
      const data = await response.json();
      if (!data.success || !data.maps || data.maps.length === 0) {
        ToastAndroid.show("No map available!", ToastAndroid.LONG);
        return;
      }
      setMapId(data.maps[0].mapId);
    } catch (error) {
      console.error("Error fetching data:", error);
      ToastAndroid.show(
        "Failed to fetch the map. Try again!",
        ToastAndroid.LONG
      );
    }
  };

  const handleSearch = () => {
    if (searchText.trim() === "") {
      ToastAndroid.show("Please enter a city name!", ToastAndroid.SHORT);
      return;
    }
    getMap(searchText.trim().toLowerCase());
    setSearchText("")
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
        <title>Mappedin Web SDK</title>
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
    <LinearGradient
      colors={["#00000070", "#000000d0"]}
      style={styles.gradientOverlay}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter a city..."
          placeholderTextColor="#ddd"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {mapId ? (
          <WebView
            source={{ html: htmlCode }}
            style={styles.web}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        ) : (
          <View style={styles.placeholder}>
            <Loader />
          </View>
        )}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Developed by THE SMART MOVE</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  searchContainer: {
    flexDirection: "row",
    width: "98%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#006BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  web: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  placeholderText: {
    fontSize: 18,
    color: "#ddd",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    opacity: 0.8,
  },
});

export default Home;

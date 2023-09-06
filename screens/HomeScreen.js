import { Alert, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from "../components/Carousel";

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "We are loading your Location"
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnables();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnables = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert("Location not Enabled", "Please enable the location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationServiceEnabled(enabled);
    }
}
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow the app to use the location service",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]
        );
      }
   

    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
};
 
  return (
    <SafeAreaView style={styles.container}>
    {/* Location and profile */}
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <Ionicons name="ios-location" size={30} color="#fd5c63" />
    <View>
    <Text style={{fontSize:18,fontWeight:'600'}}>Home</Text>
    <Text>{displayCurrentAddress}</Text>
    </View>
    <Pressable style={{marginLeft:'auto',marginRight:7}}>
        <Image style={{height:40,width:40,borderRadius:20}} source={{uri:'https://lh3.googleusercontent.com/ogw/AGvuzYYXWHJuAhReYi0du5oNqjjeBWIXM1_qmBuoliU6zQ=s32-c-mo'}} />
    </Pressable>
    </View>

    {/* Search Bar */}
    <View style={{padding:10,margin:10,flexDirection:'row',alignItems:'center',justifyContent:
    'space-between',borderWidth:0.8,borderColor:'#C0C0C0',borderRadius:7}}>
        <TextInput placeholder="Search for Item" /> 
        <FontAwesome name="search" size={24} color="#fd5c63" />
    </View>

    {/* Images Carousel  */}
    <Carousel/>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
    },
});

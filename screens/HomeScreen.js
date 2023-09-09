import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
// import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import Services from "../components/Services";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "We are loading your Location"
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [item, setItem] = useState([]);

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
  };
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

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProduct = async () => {
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        item.push(doc.data());
      });
      item?.map((service) => dispatch(getProducts(service)));
    };
    fetchProduct();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Location and profile */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="ios-location" size={30} color="#fd5c63" />
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
              <Text>{displayCurrentAddress}</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate("Profile")}
              style={{ marginLeft: "auto", marginRight: 7 }}
            >
              <Image
                style={{ height: 40, width: 40, borderRadius: 20 }}
                source={{
                  uri: "https://lh3.googleusercontent.com/ogw/AGvuzYYXWHJuAhReYi0du5oNqjjeBWIXM1_qmBuoliU6zQ=s32-c-mo",
                }}
              />
            </Pressable>
          </View>

          {/* Search Bar */}
          <View
            style={{
              padding: 10,
              margin: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 0.8,
              borderColor: "#C0C0C0",
              borderRadius: 7,
            }}
          >
            <TextInput placeholder="Search for Item" />
            <FontAwesome name="search" size={24} color="#fd5c63" />
          </View>

          {/* Images Carousel  */}
          <Carousel />

          {/* Services */}

          <Services />
          {/* Render all product Item  */}
          {product.map((item, index) => (
            <DressItem item={item} key={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
              {cart.length} items | ${total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Extra charge Might Apply
            </Text>
          </View>
          <Pressable
            style={{
              backgroundColor: "white", // Set the background color to white
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate("PickUp")}
          >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "black" }}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#F0F0F0",
  },
});

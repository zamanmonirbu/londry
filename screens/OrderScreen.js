import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();
  const handleButtonClick = () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView>
      <Image
        source={require("../assets/orderplaced.gif")}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 100,
          width: 200,
          height: 200,
        }}
      />

      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your Order has been placed
      </Text>
      <Pressable
        style={{ marginLeft: "auto", marginRight: "auto", marginTop: 100 }}
      >
        <TouchableOpacity onPress={handleButtonClick} style={styles.button}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </Pressable>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#088F8F", // Replace 'blue' with your desired background color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 18,
  },
});

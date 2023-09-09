import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const navigation = useNavigation();
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert("Empty or Invalid", "Please select all field", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK" },
      ]);
    }
    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: delivery,
      });
    }
  };
  const times = [
    { id: "1", time: "4.00 PM" },
    { id: "2", time: "4.30 PM" },
    { id: "3", time: "5.00 PM" },
    { id: "4", time: "5.30 PM" },
    { id: "5", time: "6.00 PM" },
    { id: "6", time: "6.30 PM" },
    { id: "7", time: "7.00 PM" },
    { id: "8", time: "7.30 PM" },
    { id: "9", time: "8.00 PM" },
    { id: "10", time: "8.30 PM" },
  ];
  const deliveryTime = [
    { id: "0", name: "2-3" },
    { id: "1", name: "3-4" },
    { id: "2", name: "4-5" },
    { id: "3", name: "Today" },
    { id: "4", name: "Tomorrow" },
    { id: "5", name: "7-8" },
    { id: "6", name: "8-9" },
    { id: "7", name: "9-10" },
    { id: "8", name: "10-11" },
    { id: "9", name: "11-12" },
  ];

  const handleTimePress = (time) => {
    if (selectedTime.includes(time)) {
      setSelectedTime(selectedTime.filter((item) => item !== time));
    } else {
      setSelectedTime([...selectedTime, time]);
    }
  };

  const handleDeliveryPress = (name) => {
    setDelivery(name);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Enter Address
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: "gray",
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Pick Up Date
        </Text>

        <View>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date("2023-07-01")} // Start date of the visible range
            endDate={new Date("2023-07-31")} // End date of the visible range
            initialSelectedDate={new Date("2023-07-09")} // Initial selected date
            onSelectedDateChange={(date) => {
              setSelectedDate(date); // Update the selected date
              // console.log("Selected Date:", date); // Debugging to check if the event is fired
            }}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => handleTimePress(item.time)} // Use a callback function
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                      height: 50,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                      height: 50,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Delivery Date
        </Text>

        <ScrollView horizontal showsVerticalScrollIndicator={false}>
          {deliveryTime.map((item) => (
            <Pressable
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.7,
                      height: 50,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                      height: 50,
                    }
              }
              key={item.id}
              onPress={() => handleDeliveryPress(item.name)} // Use a callback function
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
      {total === 0 ? null : (
        <Pressable
          style={{
            marginTop: "auto",
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
          {/* <Pressable onPress={proceedToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to Cart
            </Text>
          </Pressable> */}

          <Pressable
            style={{
              backgroundColor: "white", // Set the background color to white
              padding: 10,
              borderRadius: 5,
            }}
            onPress={proceedToCart}
          >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "black" }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#F0F0F0",
  },
});

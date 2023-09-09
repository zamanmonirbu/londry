import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const CartScreen = () => {
  // const route = useRoute();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const userUId = auth.currentUser.uid;
  // const pickUpDate = route.params.pickUpDate;
  const noOfDays = route.params.no_Of_days;
  const selectedPickUpTime = route.params.selectedTime;

  const placeOrder = async () => {
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUId}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      {
        merge: true,
      }
    );
    navigation.navigate("Order");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {total == 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your Cart is Empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={24}
                color="black"
              />
              <Text>Your Bucket</Text>
            </View>
            <Pressable
              style={{
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 14,
              }}
            >
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    marginVertical: 12,
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      width: 100,
                      fontSize: 16,
                      fontWeight: "500",
                      paddingLeft: 20,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderColor: "#BEBEBE",
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item));
                        dispatch(decrementQty(item));
                      }}
                      style={{ margin: 8 }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#088F8F",
                          paddingHorizontal: 8,
                          fontWeight: "600",
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item));
                        dispatch(incrementQty(item));
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 8,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      paddingRight: 20,
                    }}
                  >
                    {item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  margin: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "gray",
                    }}
                  >
                    Total Item
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                    }}
                  >
                    ${total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "gray",
                    }}
                  >
                    Delivery free | 1.2Km
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    Free
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "gray",
                    }}
                  >
                    Free Delivery On Your Order
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  margin: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "gray",
                    }}
                  >
                    Selected Date
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "gray",
                    }}
                  >
                    Number of Days
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {noOfDays} Days
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "gray",
                    }}
                  >
                    Selected Pick up Time
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {selectedPickUpTime}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  margin: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "800",
                      color: "black",
                    }}
                  >
                    To Pay
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "800",
                      color: "black",
                    }}
                  >
                    ${total + 87}
                  </Text>
                </View>
              </View>
            </View>

            {total === 0 ? null : (
              <Pressable
                style={{
                  marginTop: 70,
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
                  <Text
                    style={{ fontSize: 17, fontWeight: "500", color: "white" }}
                  >
                    {cart.length} items | ${total + 87}
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
                {/* <Pressable onPress={placeOrder}>
                  <Text
                    style={{ fontSize: 17, fontWeight: "600", color: "white" }}
                  >
                    Place Order
                  </Text>
                </Pressable> */}
                <Pressable
                  style={{
                    backgroundColor: "white", // Set the background color to white
                    padding: 10,
                    borderRadius: 5,
                  }}
                  onPress={placeOrder}
                >
                  <Text
                    style={{ fontSize: 17, fontWeight: "600", color: "black" }}
                  >
                    Place Order
                  </Text>
                </Pressable>
              </Pressable>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2  ",
  },
});

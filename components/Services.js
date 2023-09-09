import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://row.barkershoes.com/cdn/shop/products/4281FW18_a902b002-3ee3-4f1f-bc05-2da30cfd8141_1024x600@2x.png?v=1611839225",
      name: "Shoes",
    },
    {
      id: "1",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Cloths",
    },
    {
      id: "2",
      image: "https://www.globalbrandsmagazine.com/wp-content/uploads/2023/01/Top-10-Mobile-Brands-in-World.jpg",
      name: "Mobile",
    },
    {
      id: "3",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        Product Category
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable
            key={index}
            style={{
              margin: 10,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 7,
            }}
          >
            <Image
              source={{ uri: service.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {service.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});

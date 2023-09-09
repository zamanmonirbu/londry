import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://cdn-idhnn.nitrocdn.com/PTpEXoyDVUCSFbzHSPofpqBbjGSZgUnE/assets/images/optimized/rev-e915652/wp-content/uploads/2023/01/605b5a558848493df14d2d13_ecommerce-product-photography-2.jpg",
    "https://cdn-idhnn.nitrocdn.com/PTpEXoyDVUCSFbzHSPofpqBbjGSZgUnE/assets/images/optimized/rev-e915652/wp-content/uploads/2023/01/make-up-bag-cosmetic-beauty-products-make-up-bag-cosmetic-beauty-products-women-s-secrets-cosmetics-perfume-brushes-143303525.jpg",
  ];

  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274f"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});

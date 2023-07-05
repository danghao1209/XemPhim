import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SIZES, images, icons } from "../../constants";

const Favorite = (props) => {
  return (
    <View
      style={{
        bottom: props.location.bottom,
        right: props.location.right,
        position: "absolute",
        width: 130,
        backgroundColor: "#fff",
        borderRadius: 5,
      }}
    >
      <View style={style.wrappe}>
        <Image source={icons.favorite} style={style.images}></Image>
        <Text style={style.text}>Danh Sách</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    position: "absolute",
    width: 130,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  images: {
    width: 32,
    height: 32,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  wrappe: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
export default Favorite;

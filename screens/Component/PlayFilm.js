import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SIZES, images, icons } from "../../constants";

const PLayFilm = (props) => {
  return (
    <View
      style={{
        bottom: props.location.bottom,
        left: props.location.left,
        position: "absolute",
        width: 90,
        backgroundColor: "#fff",
        borderRadius: 5,
      }}
    >
      <View style={style.wrappe}>
        <Image source={icons.play} style={style.images}></Image>
        <Text style={style.text}>Phát</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    position: "absolute",
    width: 90,
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
export default PLayFilm;

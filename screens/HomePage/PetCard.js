import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

const PetCard = (props) => {
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          console.log(props.navigation.navigate("PetDetail", { data: props }));
        }}
      >
        <Image
          source={props.image}
          style={{
            width: 170,
            height: 250,
            borderRadius: 40,
            borderWidth: 1,
          }}
        />
      </TouchableOpacity>
      <Text style={style.text}>{props.name}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.padding * 2,
    marginLeft: SIZES.padding,
  },
  text: {
    marginTop: SIZES.padding,
    fontSize: SIZES.h1,
    color: COLORS.white,
    textAlign: "center",
  },
});
export default PetCard;

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "./HomePage/Header";
import Film from "./HomePage/Film";
import RenderFilm from "./HomePage/RenderFilm";
import { SIZES, COLORS } from "../constants";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header></Header>
      <Film></Film>
      <RenderFilm navigation={navigation}></RenderFilm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});

export default Home;

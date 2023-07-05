import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import PetCard from "./PetCard";

import { COLORS, SIZES, FONTS, icons, images } from "../../constants";
const PetShow = ({ navigation }) => {
  const [newPet, setNewPlants] = React.useState([
    {
      id: 0,
      name: "Super",
      img: images.dog1,
      favourite: false,
    },
    {
      id: 1,
      name: "Pug",
      img: images.dog2,
      favourite: true,
    },
    {
      id: 2,
      name: "Husky",
      img: images.dog1,
      favourite: false,
    },
    {
      id: 3,
      name: "Pitbull",
      img: images.dog2,
      favourite: false,
    },
  ]);

  const [friendList, setFriendList] = React.useState([
    {
      id: 0,
      img: images.profile1,
    },
    {
      id: 1,
      img: images.profile2,
    },
    {
      id: 2,
      img: images.profile3,
    },
    {
      id: 3,
      img: images.profile4,
    },
    {
      id: 4,
      img: images.profile5,
    },
  ]);

  React.useEffect(() => {}, []);

  function renderPets(item, index) {
    return (
      <PetCard
        name={item.name}
        image={item.img}
        navigation={navigation}
      ></PetCard>
    );
  }
  return (
    <View style={style.container}>
      <View style={style.container2}>
        <Text style={style.text}>My Pet</Text>
        <TouchableOpacity>
          <Image source={icons.plus} style={style.img}></Image>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={newPet}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderPets(item, index)}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: "70%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  container2: {
    marginTop: SIZES.padding * 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: SIZES.padding * 1,
  },
  text: {
    fontSize: SIZES.h1,
    color: COLORS.black,

    marginHorizontal: SIZES.padding,
    color: COLORS.white,
    fontWeight: "bold",
  },
  text2: {
    marginHorizontal: SIZES.padding,
    color: COLORS.gray,
    fontSize: 16,
  },
  img: {
    borderColor: COLORS.white,
    borderRadius: 4,
    width: 25,
    height: 25,
    borderWidth: 2,
  },
});
export default PetShow;

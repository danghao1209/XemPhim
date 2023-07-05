import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES, images, icons } from "../../constants";

const Fillter = (props) => {
  const [controll, setControll] = React.useState("none");
  const [kind, setKind] = React.useState(props.value);
  const [kinddata, setKindData] = React.useState(props.data);
  return (
    <View style={style.container}>
      <Text style={style.text}>{kind}</Text>
      <TouchableOpacity
        onPress={() => {
          if (controll == "none") {
            setControll("flex");
          } else {
            setControll("none");
          }
        }}
      >
        <Image source={icons.dropdown}></Image>
      </TouchableOpacity>
      <View
        style={{
          display: controll,
          width: 100,
          position: "absolute",
          top: 40,
          backgroundColor: COLORS.black,
        }}
      >
        {kinddata.map((item, key) => {
          return (
            <TouchableOpacity
              key={item.kind}
              style={style.textItemView}
              onPress={() => {
                setKind(item.kind);
                setControll("none");
              }}
            >
              <View
                style={{
                  borderBottomColor: "#fff",
                  borderBottomWidth: 0.2,
                  width: 100,
                  padding: 4,
                }}
              >
                <Text style={style.textItemView}>{item.kind}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: 130,
    marginLeft: 8,
    padding: 4,
    borderColor: "white",
    borderWidth: 0.2,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 6,
    position: "relative",
    zIndex: 99,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  selectViewOn: {
    display: "flex",
    width: 100,
    position: "absolute",
    top: 30,
    backgroundColor: COLORS.black,
    zIndex: 99,
  },
  selectViewOff: {
    display: "none",
  },
  selectViewItem: {},
  textItemView: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 3,
  },
});
export default Fillter;

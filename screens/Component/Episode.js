import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
const linkserver = 'http://192.168.162.107:6945';
const Episode = props => {
  let {description, episode, _id, image, name, name_film} = props.item;
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          console.log(props.navigation.navigate('Film', {data: props}));
        }}
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: `${linkserver}/image/${image}`}}
          style={{
            width: 120,
            height: 90,
            borderRadius: 10,
            borderWidth: 1,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.h2,
              fontWeight: '600',
            }}>
            {props.name_film}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.h3,
              fontWeight: '600',
            }}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray2,
    padding: SIZES.base - 4,
  },
  text: {
    marginTop: SIZES.padding,
    fontSize: SIZES.h1,
    color: COLORS.white,
    textAlign: 'center',
  },
});
export default Episode;

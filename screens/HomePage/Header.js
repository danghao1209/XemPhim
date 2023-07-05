import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Fillter from '../Component/Fillter';
import {SIZES, images} from '../../constants';

const Header = () => {
  return (
    <View style={style.container}>
      <Image source={images.netflix} style={{width: 40, height: 40}}></Image>
      <Text style={style.text}>Phim</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop: SIZES.padding * 2,
    marginLeft: SIZES.padding,
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
export default Header;

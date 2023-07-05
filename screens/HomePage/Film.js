import React from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import {SIZES, images} from '../../constants';
import PLayFilm from '../Component/PlayFilm';
import Favorite from '../Component/Favorite';
const Film = () => {
  return (
    <View style={style.container}>
      <ImageBackground
        source={images.thanhguomdiet}
        style={style.image}></ImageBackground>
      <Text style={style.text}>THANH GƯƠM DIỆT QUỶ</Text>
      <Favorite location={{bottom: 15, right: '50%'}}></Favorite>
      <PLayFilm location={{bottom: 15, left: '55%'}}></PLayFilm>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    zIndex: 2,
  },
  text: {
    color: '#fff',
    fontSize: 50,
    textAlign: 'center',
    position: 'absolute',
    fontWeight: '900',
    left: 0,
    right: 0,
    top: '25%',
  },
  image: {
    width: 450,
    height: 300,
    opacity: 0.3,
    justifyContent: 'center',
    position: 'relative',
    resizeMode: 'cover',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
});
export default Film;

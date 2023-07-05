import axios from 'axios';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
const linkserver = 'http://192.168.162.110:6945';

const CardFilm = props => {
  let {_id, name, ytb_id, image} = props.item;
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={async () => {
          try {
            let value = await axios.get(`${linkserver}/api/film/${_id}`);
            console.log(value?.data.data);
            let props2 = {item: value.data.data, navigator: props.navigation};
            props.navigation.navigate('Film', {data: props2});
          } catch (error) {
            Alert.alert('Thất bại', error.message, [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        }}>
        <Image
          source={{uri: `${linkserver}/image/${image}`}}
          style={{
            width: 180,
            height: 260,
            borderRadius: 10,
            borderWidth: 1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.padding,
    marginLeft: SIZES.padding - SIZES.padding / 2,
  },
  text: {
    marginTop: SIZES.padding,
    fontSize: SIZES.h1,
    color: COLORS.white,
    textAlign: 'center',
  },
});
export default CardFilm;

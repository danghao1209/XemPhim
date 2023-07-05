import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SIZES, COLORS, icons} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Video from 'react-native-video';
//import Orientation from 'react-native-orientation';
const linkserver = 'http://192.168.162.110:6945';

const FilmDetail = ({route, navigation}) => {
  const {description, episode, _id, image, name, ytb_id, view} =
    route.params.data.item;

  const [episodes, setepisode] = useState([]);
  const [currentVideo, setcurrentVideo] = useState('');
  const [currentEpisode, setcurrentEpisode] = useState('');
  const [token, setToken] = useState('');

  const onStateChange = useCallback(async state => {
    if (state === 'buffering') {
      let token = await AsyncStorage.getItem('token');
      let payload = {
        id: _id,
      };
      let respon = await axios.post(`${linkserver}/api/user/view`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(respon.data);
    }
  }, []);

  // useEffect(() => {
  //   setcurrentVideo(ytb_id);
  //   setepisode(episode);

  //   Orientation.addOrientationListener(handleOrientationChange);

  //   return () => {
  //     Orientation.removeOrientationListener(handleOrientationChange);
  //   };
  // }, []);

  // const handleOrientationChange = orientation => {
  //   if (orientation === 'LANDSCAPE') {
  //     Orientation.lockToLandscape();
  //   } else {
  //     Orientation.lockToPortrait();
  //   }
  // };

  async function Like(id) {
    try {
      let tokens = await AsyncStorage.getItem('token');
      let payload = {
        id: id,
      };
      console.log(token);
      let data = await axios.post(`${linkserver}/api/user/like`, payload, {
        headers: {
          Authorization: `Bearer ${tokens}`,
          'Content-Type': 'application/json',
        },
      });
      if (data.data.status) {
        console.log(data.data);
      }
    } catch (error) {}
  }

  function RenderEpisode(item, index, name) {
    return (
      <View style={{backgroundColor: COLORS.gray2, padding: SIZES.base - 4}}>
        <TouchableOpacity
          onPress={async () => {
            setcurrentVideo(item.ytb_id);
            setcurrentEpisode(item);
          }}
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: `${linkserver}/image/${item.image}`}}
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
              {name}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.h3,
                fontWeight: '600',
              }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: SIZES.padding * 2 + 5, flex: 1}}>
        {/* <Video
          source={{
            uri: `http://192.168.162.110:6945/api/episode/63ba8ab80cfb9128a34f59e9`,
          }} // Thay đổi URL tương ứng với máy chủ của bạn và idPhim
          style={{width: '100%', height: '230'}}
          controls={true} // Hiển thị các nút điều khiển
          paused={false} // Bắt đầu phát tự động
          resizeMode="contain"
          onChangeState={onStateChange}
        /> */}
        <Text style={styles.textFilm}>{name}</Text>
        <View style={styles.Interactive}>
          <View style={{alignItems: 'center'}}>
            <Image source={icons.view} style={{width: 20, height: 20}}></Image>
            <Text style={{color: COLORS.white}}>Lượt Xem {view}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log('liked');
              Like(_id);
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={icons.like}
                style={{width: 20, height: 20}}></Image>
              <Text style={{color: COLORS.white}}>Yêu Thích</Text>
            </View>
          </TouchableOpacity>

          <View style={{alignItems: 'center'}}>
            <Image source={icons.start} style={{width: 20, height: 20}}></Image>

            <Text style={{color: COLORS.white}}>Đánh Giá</Text>
          </View>
        </View>
        <View style={{marginTop: SIZES.padding - 10}}>
          <Text
            style={{
              color: COLORS.white,
              fontWeight: '600',
              marginLeft: SIZES.padding,
              fontSize: SIZES.h3,
            }}>
            Mô Tả:
          </Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <View style={{marginTop: SIZES.padding - 10, flex: 1}}>
          <Text
            style={{
              color: COLORS.white,
              fontWeight: '600',
              marginLeft: SIZES.padding,
              fontSize: SIZES.h3,
            }}>
            Tập Phim({episode?.length}):
          </Text>
          <FlatList
            data={episodes}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => RenderEpisode(item, index, name)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  textFilm: {
    marginTop: SIZES.base,
    fontSize: SIZES.h2,
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  descriptionText: {
    marginLeft: SIZES.base,
    fontSize: SIZES.h4,
    color: COLORS.white,
    marginTop: SIZES.base,
  },
  Interactive: {
    marginTop: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'auto',
  },
});

export default FilmDetail;

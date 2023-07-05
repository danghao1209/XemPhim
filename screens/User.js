import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {images, icons, COLORS, FONTS, SIZES} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardFilm from './HomePage/CardFilm';
import axios from 'axios';

const linkserver = 'http://192.168.162.110:6945';

const User = ({navigation}) => {
  const [info, setinfo] = useState('');
  const [token, setToken] = useState('');
  const [video, setVideo] = useState([]);
  const [title, setTitle] = useState('');
  useEffect(() => {
    async function getInfo() {
      try {
        let token = await AsyncStorage.getItem('token');
        setToken(token);
        let data = await axios.get(`${linkserver}/api/user/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setinfo(data?.data.message);
        console.log(info);
      } catch (error) {}
    }
    getInfo();
    getHistoryVideo();
  }, []);

  function convert(diffTime) {
    let date = Math.round(diffTime) + ' phút trước';
    if (diffTime > 60) {
      date = Math.round(diffTime / 60) + ' giờ trước';
    }
    if (diffTime / 60 > 24) {
      date = Math.round(diffTime / 60 / 24) + ' ngày trước';
    }
    if (diffTime / 60 / 24 > 7) {
      date = Math.round(diffTime / 60 / 24 / 7) + ' tuần trước';
    }
    return date;
  }

  async function LogOut() {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {}
  }
  async function getHistoryVideo() {
    try {
      let data = await axios.get(`${linkserver}/api/user/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setVideo(data?.data.data);
    } catch (error) {}
  }

  async function getLikedVideo() {
    try {
      let data = await axios.get(`${linkserver}/api/user/like`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setVideo(data?.data.data);
    } catch (error) {}
  }

  async function Like(id) {
    try {
      let payload = {
        id: id,
      };
      let data = await axios.post(`${linkserver}/api/user/like`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(data.data);
    } catch (error) {}
  }

  function renderVideo(item) {
    let timenow = Date.now();
    let diff = (timenow - item.timespan) / 1000 / 60;
    let timespan = convert(diff);

    return (
      <View
        style={{
          backgroundColor: COLORS.gray2,
          padding: SIZES.base - 4,
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onPress={() => {
            let props = {item: item.film, navigation: navigation};
            navigation.navigate('Film', {data: props});
          }}>
          <Image
            source={{uri: `${linkserver}/image/${item.film.image}`}}
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
              {item.film.name}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.h3,
                fontWeight: '600',
              }}>
              {timespan}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.displayname}>
        <View
          style={{
            borderColor: COLORS.white,
            borderRadius: '50%',
            borderWidth: 1,
          }}>
          <Image
            source={icons.heart}
            style={{
              tintColor: '#fff',
              width: 50,
              height: 50,
              margin: 20,
            }}></Image>
        </View>
        <View>
          <Text style={styles.textinfo}>{info.displayname}</Text>
        </View>
        <View>
          <Image
            source={icons.edit}
            style={{
              tintColor: '#fff',
              width: 25,
              height: 25,
              margin: 20,
            }}></Image>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              getHistoryVideo();
              setTitle('Danh Sách Video Đã Xem');
            }}>
            <Image
              source={icons.history}
              style={{tintColor: '#fff', width: 40, height: 40}}></Image>
            <Text style={styles.textbtn}>Video đã xem</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setTitle('Danh Sách Video Yêu Thích');
              getLikedVideo();
            }}>
            <Image
              source={icons.like}
              style={{tintColor: '#fff', width: 40, height: 40}}></Image>
            <Text style={styles.textbtn}>Video yêu thích</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnLogout}>
        <TouchableOpacity
          onPress={() => {
            LogOut();
          }}>
          <Text
            style={{color: COLORS.white, fontSize: 20, textAlign: 'center'}}>
            Đăng Xuất
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 20,
            marginBottom: SIZES.base,
          }}>
          {title}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={video}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => renderVideo(item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  displayname: {
    marginTop: SIZES.padding * 2 + 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    justifyContent: 'space-between',
  },
  textinfo: {
    color: COLORS.white,
    fontSize: 20,
  },
  textbtn: {
    color: COLORS.white,
    fontSize: 20,
  },
  btn: {
    margin: 20,
    alignItems: 'center',
  },
  btnLogout: {
    margin: 20,
  },
});

export default User;

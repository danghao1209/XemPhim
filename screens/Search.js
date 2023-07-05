import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';

import {images, icons, COLORS, FONTS, SIZES} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardFilm from './HomePage/CardFilm';
import axios from 'axios';
const linkserver = 'http://192.168.162.110:6945';

const Search = ({navigation}) => {
  const [storeSearch, setstoreSearch] = useState([]);
  const [Search, setSearch] = useState('');
  const [film, setfilm] = useState([]);
  const [token, setToken] = useState([]);
  useEffect(() => {
    try {
      async function getToken() {
        let token = await AsyncStorage.getItem('token');
        setToken(token);
      }
      getToken();
      getSearch();
      return setfilm([]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function getSearch() {
    try {
      let token = await AsyncStorage.getItem('token');
      setToken(token);
      let data = await axios.get(`${linkserver}/api/user/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setstoreSearch(data.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function renderFilm(item) {
    return <CardFilm item={item} navigation={navigation}></CardFilm>;
  }
  async function SearchFilm(film) {
    try {
      let payload = {
        search: film,
      };
      let data = await axios.post(`${linkserver}/api/user/search`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (data.data.status) {
        setfilm(data.data.data);
      }
    } catch (error) {}
  }
  function renderSearch(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          setSearch(item);
        }}>
        <View
          style={{
            backgroundColor: COLORS.gray2,
            marginLeft: SIZES.padding,
            marginTop: SIZES.base,
            borderRadius: 10,
          }}>
          <Text style={{color: COLORS.white, padding: 8}}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Tìm Kiếm"
          placeholderTextColor="#BEC1D2"
          onChangeText={newText => setSearch(newText)}
          value={Search}></TextInput>
        <TouchableOpacity
          onPress={() => {
            SearchFilm(Search);
            getSearch();
          }}>
          <Image
            source={icons.search}
            style={{tintColor: '#fff', width: 35, height: 35}}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.timkiemganday}>
        <Text style={{color: '#fff', marginLeft: SIZES.base + 5}}>
          Tìm kiếm gần đây
        </Text>
        <FlatList
          data={storeSearch}
          horizontal={true}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => renderSearch(item, index)}
          showsHorizontalScrollIndicator={false}></FlatList>
      </View>
      <View style={styles.ketquatimkiem}>
        <Text style={{color: '#fff', marginLeft: SIZES.base + 5}}>
          Kết quả tìm kiếm
        </Text>
        <FlatList
          numColumns={2}
          data={film}
          horizontal={false}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => renderFilm(item, index)}
          showsHorizontalScrollIndicator={false}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.black,
  },
  search: {
    marginTop: SIZES.padding * 2,
    marginLeft: SIZES.padding - 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 320,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#303030',
    color: '#BEC1D2',
    margin: 8,
    padding: 10,
  },
  timkiemganday: {},
  ketquatimkiem: {
    marginTop: SIZES.base,
    flex: 1,
  },
});

export default Search;

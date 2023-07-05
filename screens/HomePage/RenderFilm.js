import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {images} from '../../constants';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import CardFilm from './CardFilm';
const linkserver = 'http://192.168.162.110:6945';
const RenderFilm = props => {
  const kind = [
    {kind: 'Tất Cả'},
    {kind: 'Tình Cảm'},
    {kind: 'Kinh Dị'},
    {kind: 'KHVT'},
    {kind: 'Anime'},
    {kind: 'Võ Thuật'},
  ];
  const [newFilm, setFilm] = useState([]);
  const [storeFilm, setStore] = useState([]);
  const [currentKind, setCurrentKind] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const value = await axios.get(`${linkserver}/api/film`);
        setFilm(value.data.data);
        setStore(value.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  function FilterFilm(kind) {
    if ('Tất cả' == kind) {
      setFilm(result);
    } else {
      const result = storeFilm.filter(word => {
        if (kind == word.kind) return word;
      });
      setFilm(result);
    }
  }
  function renderFilm(item, index) {
    return <CardFilm item={item} navigation={props.navigation}></CardFilm>;
  }
  return (
    <View style={style.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}>
        <View>
          <Text style={style.text}>Danh Sách Phim</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <Text style={style.text2}>{kind[currentKind].kind}</Text>
          <TouchableOpacity
            onPress={async () => {
              let index = currentKind;
              index++;
              if (index >= kind.length) {
                index = 0;
              }
              setCurrentKind(index);
              FilterFilm(kind[index].kind);
            }}>
            <Image
              source={icons.back}
              style={{width: 20, height: 20, marginTop: 11}}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          numColumns={2}
          data={newFilm}
          keyExtractor={item => item._id.toString()}
          renderItem={({item, index}) => renderFilm(item, index)}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginLeft: SIZES.padding + 5,
    marginTop: SIZES.padding - 11,
    fontSize: SIZES.h2,
    color: COLORS.white,
    fontWeight: '600',
  },
  text2: {
    marginTop: SIZES.padding - 11,
    marginRight: SIZES.padding + 5,
    fontSize: SIZES.h3,
    color: COLORS.white,
    fontWeight: '600',
  },
});
export default RenderFilm;

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {images} from '../constants';
const linkserver = 'http://192.168.162.110:6945';
const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    try {
      (async () => {
        let token = await AsyncStorage.getItem('token');
        if (token) {
          navigation.navigate('Tabs');
        } else {
        }
      })();
    } catch (e) {}
  });
  async function Login(username, password) {
    try {
      const result = await axios.post(`${linkserver}/api/user/login`, {
        username,
        password,
      });
      await AsyncStorage.setItem('token', result?.data?.token);
      navigation.navigate('Tabs');
    } catch (error) {
      Alert.alert('Thất bại', error.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={images.netflix}
          style={{width: 150, height: 150}}></Image>
        <TextInput
          style={styles.input}
          placeholder="Email hoặc số điện thoại"
          placeholderTextColor="#fff"
          defaultValue={username}
          onChangeText={newText => setUsername(newText)}></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Mật Khẩu"
          placeholderTextColor="#fff"
          onChangeText={newText => setPassword(newText)}></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // navigation.navigate("Tabs");
            Login(username, password);
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              opacity: 0.2,
            }}>
            Đăng Nhập
          </Text>
        </TouchableOpacity>
        <Text
          style={{color: '#fff', opacity: 0.6, fontSize: 12, marginTop: 20}}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Nếu bạn chưa có tài khoản, vui lòng{' '}
          <Text
            style={{
              textDecorationLine: 'underline',
              padding: 3,
            }}>
            đăng ký
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    marginTop: SIZES.padding * 2,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 45,
    borderRadius: 4,
    backgroundColor: '#303030',
    color: '#fff',
    margin: 8,
    padding: 10,
  },
  button: {
    marginTop: 8,
    borderColor: '#000',
    borderWidth: 0.5,
    width: 300,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Login;

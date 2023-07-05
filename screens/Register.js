import React, {useState} from 'react';
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
import axios from 'axios';
const linkserver = 'http://192.168.162.110:6945';
const Register = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayname, setdisplayname] = useState('');
  async function Register(displayname, username, password) {
    try {
      const payload = {
        username: username,
        password: password,
        displayname: displayname,
      };
      const data = await axios.post(
        `${linkserver}/api/user/register`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      Alert.alert('Thành công', data.data.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } catch (error) {
      Alert.alert('Thất bại', data.data.message, [
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
          placeholder="Họ Tên"
          placeholderTextColor="#fff"
          defaultValue={displayname}
          onChangeText={newText => setdisplayname(newText)}></TextInput>
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
            Register(displayname, username, password);
          }}>
          <Text style={{color: '#fff', fontSize: 18}}>Đăng Ký</Text>
        </TouchableOpacity>
        <Text
          style={{color: '#fff', opacity: 0.6, fontSize: 12, marginTop: 20}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Nếu bạn đã có tài khoản,{' '}
          <Text style={{textDecorationLine: 'underline', padding: 3}}>
            đăng nhập
          </Text>{' '}
          tại đây
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
export default Register;

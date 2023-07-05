import React, {useEffect, useState, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import Login from './screens/Login';
import Register from './screens/Register';
import FilmDetail from './screens/FilmDetail';
import {Notifications} from 'react-native-notifications';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};
// const registerNotificationEvents = async () => {
//   try {
//     let token;
//     const {status: existingStatus} = await Notifications.checkPermissions();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'authorized') {
//       const {status} = await Notifications.requestPermissions();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'authorized') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getDevicePushToken()).token;
//     console.log(token);

//     // Đăng ký các sự kiện thông báo
//     Notifications.events().registerNotificationReceivedForeground(
//       (notification, completion) => {
//         // Xử lý thông báo được nhận khi ứng dụng đang chạy ở foreground
//         completion({
//           alert: notification.payload.showAlert,
//           sound: false,
//           badge: false,
//         });
//       },
//     );

//     Notifications.events().registerNotificationOpened(
//       (notification, completion) => {
//         // Xử lý thông báo khi người dùng nhấn vào thông báo để mở ứng dụng
//         completion();
//       },
//     );

//     Notifications.events().registerNotificationReceivedBackground(
//       (notification, completion) => {
//         // Xử lý thông báo được nhận khi ứng dụng đang chạy ở background
//         completion(Notifications.BackgroundFetchResult.NoData);
//       },
//     );

//     if (Platform.OS === 'ios') {
//       Notifications.ios.events().appNotificationSettingsLinked(() => {
//         console.warn('App Notification Settings Linked');
//       });
//     }
//     return token;
//   } catch (error) {
//     throw new Error(``);
//   }
// };
const Stack = createStackNavigator();

export default function App() {
  // useEffect(() => {
  //   try {
  //     registerNotificationEvents().then(token => console.log(token));
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
        }}>
        {/* Tabs */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Film"
          component={FilmDetail}
          options={{headerShown: false}}
        />
        {/* Screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Notification, Search, User} from '../screens';

import {COLORS} from '../constants';
import {icons} from '../constants/index';
const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  pressColor: 'gray',
  style: {
    backgroundColor: 'black',
  },
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: COLORS.black},
        headerShown: false,
        headerTransparent: true,
        tabBarIcon: ({focused}) => {
          const tintColor = focused ? COLORS.red : COLORS.gray;
          const borderTop = focused ? 1 : 0;
          const bg_Color = focused ? COLORS.primary : COLORS.black;
          switch (route.name) {
            case 'Home':
              return (
                <Image
                  source={icons.home}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
            case 'Search':
              return (
                <Image
                  source={icons.search}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case 'Notification':
              return (
                <Image
                  source={icons.notification}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case 'User':
              return (
                <Image
                  source={icons.heart}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export default Tabs;

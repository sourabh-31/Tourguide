import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeTab from './HomeTab';
// import ExploreTab from './ExploreTab';
import ExploreStack from './ExploreStack';
import FavTab from './FavTab';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import HomeDescriptionNavigate from './HomeDescriptionNavigate';
import CamStack from './CamStack';
import AccountStack from './AccountStack';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    // tabBarHideOnKeyboard: true,
    tabBarStyle: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 10,
      height: 60,
      // borderTopLeftRadius: 15,
      // borderTopRightRadius: 15,
    },
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeDescriptionNavigate}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.bottomBox}>
                <FontAwesome6
                  name={'house'}
                  regular
                  size={22}
                  color={focused ? '#0c1c2c' : '#c0c8cc'}
                />
                {/* <Text
                  style={[
                    styles.bottomtext,
                    {color: focused ? '#0c1c2c' : '#c0c8cc'},
                  ]}>
                  Home
                </Text> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.bottomBox}>
                <FontAwesome6
                  name={'compass'}
                  solid
                  size={22}
                  color={focused ? '#0c1c2c' : '#c0c8cc'}
                />
                {/* <Text
                  style={[
                    styles.bottomtext,
                    {color: focused ? '#0c1c2c' : '#c0c8cc'},
                  ]}>
                  Explore
                </Text> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CamStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.bottomBox}>
                <FontAwesome6
                  name={'camera'}
                  size={24}
                  color={focused ? '#0c1c2c' : '#c0c8cc'}
                />
                {/* <Text
                  style={[
                    styles.bottomtext,
                    {color: focused ? '#0c1c2c' : '#c0c8cc'},
                  ]}>
                  AI Tool
                </Text> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavTab}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.bottomBox}>
                <FontAwesome6
                  name={'person-circle-exclamation'}
                  size={22}
                  color={focused ? '#0c1c2c' : '#c0c8cc'}
                />
                {/* <Text
                  style={[
                    styles.bottomtext,
                    {color: focused ? '#0c1c2c' : '#c0c8cc'},
                  ]}>
                  Help
                </Text> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.bottomBox}>
                <FontAwesome6
                  name={'user'}
                  solid
                  size={22}
                  color={focused ? '#0c1c2c' : '#c0c8cc'}
                />
                {/* <Text
                  style={[
                    styles.bottomtext,
                    {color: focused ? '#0c1c2c' : '#c0c8cc'},
                  ]}>
                  Account
                </Text> */}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  bottomtext: {
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
  },
  bottomBox: {
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
    gap: 3,
  },
});

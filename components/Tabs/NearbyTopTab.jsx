import {StyleSheet, Text, View, Easing} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FoodScreen from '../TopTabScreens/FoodScreen';
import HospitalScreen from '../TopTabScreens/HospitalScreen';
import LodgeScreen from '../TopTabScreens/LodgeScreen';
import ShopScreen from '../TopTabScreens/ShopScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const NearbyTopTab = () => {
  const Tab = createMaterialTopTabNavigator();

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    // tabBarHideOnKeyboard: true,
    tabBarItemStyle: {
      height: 80,
      marginTop: -15,
      marginLeft: -25,
    },
    tabBarIndicatorStyle: {
      display: 'none',
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Food"
        component={FoodScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.topBox}>
                <MaterialIcon
                  name={'silverware-clean'}
                  size={26}
                  color={focused ? '#a970ff' : '#0c1c2c'}
                />
                <Text
                  style={[
                    styles.toptext,
                    {color: focused ? '#a970ff' : '#0c1c2c'},
                  ]}>
                  Food
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Lodge"
        component={LodgeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.topBox}>
                <FontAwesome6
                  name={'bed'}
                  size={22}
                  color={focused ? '#a970ff' : '#0c1c2c'}
                />
                <Text
                  style={[
                    styles.toptext,
                    {color: focused ? '#a970ff' : '#0c1c2c'},
                  ]}>
                  Lodge
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.topBox}>
                <FontAwesome6
                  name={'bag-shopping'}
                  size={22}
                  color={focused ? '#a970ff' : '#0c1c2c'}
                />
                <Text
                  style={[
                    styles.toptext,
                    {color: focused ? '#a970ff' : '#0c1c2c'},
                  ]}>
                  Store
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Hospital"
        component={HospitalScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.topBox}>
                <FontAwesome6
                  name={'hospital'}
                  solid
                  size={22}
                  color={focused ? '#a970ff' : '#0c1c2c'}
                />
                <Text
                  style={[
                    styles.toptext,
                    {color: focused ? '#a970ff' : '#0c1c2c'},
                  ]}>
                  Hospital
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default NearbyTopTab;

const styles = StyleSheet.create({
  toptext: {
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
    width: 50,
    textAlign: 'center',
  },
  topBox: {
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
    gap: 3,
    height: 30,
    width: 40,
  },
});

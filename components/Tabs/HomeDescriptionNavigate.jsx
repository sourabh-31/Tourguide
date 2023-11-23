import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DescriptionTab from './DescriptionTab';
import HomeTab from './HomeTab';
import MorePlaces from './MorePlaces';

const Stack = createStackNavigator();

const HomeNavigate = () => {
  return (
    <Stack.Navigator initialRouteName="HomePart">
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DescriptionTab"
        component={DescriptionTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MorePlacesTab"
        component={MorePlaces}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigate;

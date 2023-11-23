import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExploreTab from './ExploreTab';
import NearbyPlaces from './NearbyPlaces';

const Stack = createStackNavigator();

const ExploreStack = () => {
  return (
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen
        name="ExploreTab"
        component={ExploreTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NearbyPlaces"
        component={NearbyPlaces}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ExploreStack;

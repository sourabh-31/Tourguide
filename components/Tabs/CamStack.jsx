import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CamTab from './CamTab';
import CloudVisionTab from './CloudVisionTab';

const Stack = createStackNavigator();

const CamStack = () => {
  return (
    <Stack.Navigator initialRouteName="CamTab">
      <Stack.Screen
        name="CamTab"
        component={CamTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CloudVisionTab"
        component={CloudVisionTab}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CamStack;
